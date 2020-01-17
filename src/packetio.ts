import { EventEmitter } from 'events';
import { Socket } from 'net';
import { createPacket } from './create-packet';
import { INCOMING_KEY, OUTGOING_KEY, RC4 } from './crypto';
import { Packet } from './packet';
import { PacketMap } from './packet-map';
import { Reader } from './reader';
import { Writer } from './writer';

/**
 * The configuration for the RC4 ciphers used by this PacketIO.
 */
export interface RC4Config {
  incomingKey: string;
  outgoingKey: string;
}

/**
 * An RC4 configuration which is suitable for
 * PacketIO instances being used as a client.
 */
const DEFAULT_RC4: RC4Config = {
  incomingKey: INCOMING_KEY,
  outgoingKey: OUTGOING_KEY,
};

/**
 * A utility class which implements the RotMG messaging protocol on top of a `Socket`.
 */
export class PacketIO extends EventEmitter {

  /**
   * The last packet which was received.
   */
  get lastIncomingPacket(): Packet {
    return this._lastIncomingPacket;
  }

  /**
   * The last packet which was sent.
   */
  get lastOutgoingPacket(): Packet {
    return this._lastOutgoingPacket;
  }

  /**
   * The socket this packet interface is attached to.
   */
  socket: Socket;

  /**
   * A packet map object which can be used to resolve incoming and outgoing packet types.
   */
  packetMap: PacketMap;

  private sendRC4: RC4;
  private receiveRC4: RC4;

  private outgoingQueue: Packet[];

  private writer: Writer;
  private reader: Reader;
  private eventHandlers: Map<string, (...args: any[]) => void>;
  // tslint:disable:variable-name
  private _lastIncomingPacket: Packet;
  private _lastOutgoingPacket: Packet;
  // tslint:enable:variable-name

  /**
   * Creates a new `PacketIO` instance.
   * @param opts The options to use for this instance.
   */
  constructor(opts: { socket?: Socket, rc4?: RC4Config, packetMap?: PacketMap } = { rc4: DEFAULT_RC4, packetMap: {} }) {
    super();
    if (!opts.rc4) {
      opts.rc4 = DEFAULT_RC4;
    }
    this.writer = new Writer();
    this.reader = new Reader();
    this.outgoingQueue = [];
    this.sendRC4 = new RC4(Buffer.from(opts.rc4.outgoingKey, 'hex'));
    this.receiveRC4 = new RC4(Buffer.from(opts.rc4.incomingKey, 'hex'));
    this.packetMap = opts.packetMap || {};

    this.eventHandlers = new Map([
      ['data', this.onData.bind(this)],
      ['connect', this.resetState.bind(this)],
    ]);

    if (opts.socket) {
      this.attach(opts.socket);
    }
  }

  /**
   * Attaches this Packet IO to the `socket`.
   * @param socket The socket to attach to.
   */
  attach(socket: Socket): void {
    if (!(socket instanceof Socket)) {
      throw new TypeError(`Parameter "socket" should be a Socket, not ${typeof socket}`);
    }
    if (this.socket) {
      this.detach();
    }
    // we should reset the state here in
    // case the socket is already connected.
    this.resetState();
    this.socket = socket;
    for (const [event, listener] of this.eventHandlers) {
      this.socket.on(event, listener);
    }
  }

  /**
   * Detaches this Packet IO from its `Socket`.
   */
  detach(): void {
    if (this.socket) {
      for (const [event, listener] of this.eventHandlers) {
        this.socket.removeListener(event, listener);
      }
      this.socket = undefined;
    }
  }

  /**
   * Sends a packet.
   * @param packet The packet to send.
   */
  send(packet: Packet) {
    if (!this.socket || this.socket.destroyed) {
      this.emitError(new Error('Not attached to a socket.'));
      return;
    }
    const type = this.packetMap[packet.type];
    if (type === undefined) {
      this.emitError(new Error(`Mapper is missing an id for the packet type ${packet.type}`));
      return;
    }

    if (this.outgoingQueue.length === 0) {
      this.outgoingQueue.push(packet);
      this.drainQueue();
    } else {
      this.outgoingQueue.push(packet);
    }
  }

  /**
   * Emits a packet from this PacketIO instance. This will only
   * emit the packet to the clients subscribed to this particular PacketIO.
   * @param packet The packet to emit.
   */
  emitPacket(packet: Packet): void {
    if (packet && typeof packet.type === 'string') {
      this._lastIncomingPacket = packet;
      this.emit(packet.type, packet);
    } else {
      throw new TypeError(`Parameter "packet" must be a Packet, not ${typeof packet}`);
    }
  }

  /**
   * Takes packets from the outgoing queue and writes
   * them to the socket.
   */
  private async drainQueue() {
    while (this.outgoingQueue.length > 0) {
      this._lastOutgoingPacket = this.outgoingQueue[0];
      this.writer.index = 5;
      const type = this.packetMap[this.outgoingQueue[0].type];
      this.outgoingQueue[0].write(this.writer);
      this.writer.writeHeader(type);
      this.sendRC4.cipher(this.writer.buffer.slice(5, this.writer.index));
      await new Promise((resolve) => {
        if (this.socket && !this.socket.write(this.writer.buffer.slice(0, this.writer.index))) {
          this.socket.once('drain', resolve);
        } else {
          process.nextTick(resolve);
        }
      });
      this.outgoingQueue.shift();
    }
  }

  /**
   * Resets the reader buffer and the RC4 instances.
   */
  private resetState(): void {
    this.resetBuffer();
    this.sendRC4.reset();
    this.receiveRC4.reset();
  }

  /**
   * Adds the data received from the socket to the reader buffer.
   * @param data The data received.
   */
  private onData(data: Buffer): void {
    let dataIdx = 0;
    while (dataIdx < data.length) {
      const copied = data.copy(this.reader.buffer, this.reader.index, dataIdx, dataIdx + this.reader.remaining);
      dataIdx += copied;
      this.reader.index += copied;
      if (this.reader.remaining === 0) {
        if (this.reader.length === 4) {
          const newSize = this.reader.buffer.readInt32BE(0);
          this.reader.resizeBuffer(newSize);
        } else {
          const packet = this.constructPacket();
          this.resetBuffer();
          if (packet) {
            this.emitPacket(packet);
          }
        }
      }
    }
  }

  /**
   * Attempts to create a packet from the data contained
   * in the reader buffer. No packet will be created if
   * there is no event listener for the packet type.
   */
  private constructPacket(): Packet {
    this.receiveRC4.cipher(this.reader.buffer.slice(5, this.reader.length));
    try {
      const id = this.reader.buffer.readInt8(4);
      const type = this.packetMap[id];
      if (!type) {
        throw new Error(`No packet type for the id ${id}`);
      }
      if (this.listenerCount(type) !== 0) {
        const packet = createPacket(type);
        this.reader.index = 5;
        packet.read(this.reader);
        return packet;
      }
    } catch (error) {
      this.emitError(error);
    }
    return undefined;
  }

  /**
   * Resets the incoming packet buffer so that it
   * is ready to receive the next packet header.
   */
  private resetBuffer(): void {
    this.reader.resizeBuffer(4);
    this.reader.index = 0;
  }

  /**
   * Emits an `'error'` event if there are any listeners for it,
   * or throws the error if there are no listeners.
   * @param error The error to emit.
   */
  private emitError(error: Error): void {
    if (this.listenerCount('error') === 0) {
      throw error;
    } else {
      this.emit('error', error);
    }
  }
}
