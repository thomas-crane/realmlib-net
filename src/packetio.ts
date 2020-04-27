import { EventEmitter } from 'events';
import { Duplex } from 'stream';
import { createPacket } from './create-packet';
import { INCOMING_KEY, OUTGOING_KEY, RC4 } from './crypto';
import { Packet } from './packet';
import { PacketMap } from './packet-map';
import { PacketType } from './packet-type';
import { PacketHeader } from './packets/header';
import * as IncomingPackets from './packets/incoming';
import * as OutgoingPackets from './packets/outgoing';
import { BufferReader } from './reader/buffer-reader';
import { BufferWriter } from './writer/buffer-writer';

/**
 * The configuration for the RC4 ciphers used by this PacketIO.
 */
export interface RC4Config {
  incomingKey: string;
  outgoingKey: string;
}

export interface PacketIOArguments {
  stream: Duplex;
  rc4: RC4Config;
  packetMap: PacketMap;
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
 * Events which can be emitted by streams that
 * the packet io should listen to.
 */
type StreamEvent = 'readable' | 'close';

/**
 * A utility class which implements the RotMG messaging protocol on top of a `Socket`.
 */
export class PacketIO extends EventEmitter {

  /**
   * The last packet which was received.
   */
  get lastIncomingPacket(): Packet | undefined {
    return this._lastIncomingPacket;
  }

  /**
   * The last packet which was sent.
   */
  get lastOutgoingPacket(): Packet | undefined {
    return this._lastOutgoingPacket;
  }

  /**
   * The socket this packet interface is attached to.
   */
  stream: Duplex | undefined;

  /**
   * A packet map object which can be used to resolve incoming and outgoing packet types.
   */
  packetMap: PacketMap;

  private sendRC4: RC4;
  private receiveRC4: RC4;

  private outgoingQueue: Packet[];

  private writeBuffer: Buffer;
  private header: PacketHeader | undefined;

  private eventHandlers: Map<StreamEvent, (...args: any[]) => void>;
  // tslint:disable:variable-name
  private _lastIncomingPacket: Packet | undefined;
  private _lastOutgoingPacket: Packet | undefined;
  // tslint:enable:variable-name

  /**
   * Creates a new `PacketIO` instance.
   * @param opts The options to use for this instance.
   */
  constructor(opts: Partial<PacketIOArguments>) {
    super();
    // setup args.
    if (!opts.rc4) {
      opts.rc4 = DEFAULT_RC4;
    }
    if (!opts.packetMap) {
      opts.packetMap = new PacketMap({});
    }

    // setup io buffers/crypto.
    this.outgoingQueue = [];
    this.writeBuffer = Buffer.allocUnsafe(Buffer.poolSize);
    this.sendRC4 = new RC4(opts.rc4.outgoingKey);
    this.receiveRC4 = new RC4(opts.rc4.incomingKey);
    this.packetMap = opts.packetMap;

    // events.
    this.eventHandlers = new Map([
      ['readable', this.onReadable.bind(this)],
      ['close', this.resetState.bind(this)],
    ]);

    if (opts.stream) {
      this.attach(opts.stream);
    }
  }

  /**
   * Attaches this Packet IO to the `socket`.
   * @param socket The socket to attach to.
   */
  attach(stream: Duplex): void {
    if (this.stream) {
      this.detach();
    }
    // we should reset the state here in
    // case the socket is already connected.
    this.resetState();
    this.stream = stream;
    for (const [event, listener] of this.eventHandlers) {
      this.stream.on(event, listener);
    }
  }

  /**
   * Detaches this Packet IO from its `Socket`.
   */
  detach(): void {
    if (this.stream) {
      for (const [event, listener] of this.eventHandlers) {
        this.stream.removeListener(event, listener);
      }
      this.stream = undefined;
    }
  }

  /**
   * Sends a packet.
   * @param packet The packet to send.
   */
  send(packet: Packet) {
    if (!this.stream || this.stream.destroyed) {
      this.emit('error', new Error('Not attached to a stream.'));
      return;
    }
    const id = this.packetMap.getId(packet.type);
    if (id === undefined) {
      this.emit('error', new Error(`Mapper is missing an id for the packet type ${packet.type}`));
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
    this._lastIncomingPacket = packet;
    this.emit(packet.type, packet);
  }

  /**
   * Takes packets from the outgoing queue and writes
   * them to the socket.
   */
  private async drainQueue() {
    const packet = this.outgoingQueue.shift()!;
    this._lastOutgoingPacket = packet;
    // write the packet to the buffer.
    const writer = new BufferWriter(this.writeBuffer.slice(5));
    packet.write(writer);
    this.sendRC4.cipher(this.writeBuffer.slice(0, writer.bytesWritten));

    // write the header.
    const id = this.packetMap.getId(packet.type)!;
    const headerWriter = new BufferWriter(this.writeBuffer.slice(0, 5));
    headerWriter.writeInt32(5 + writer.bytesWritten);
    headerWriter.writeByte(id);

    // send the packet
    if (this.stream && !this.stream.write(this.writeBuffer.slice(0, writer.bytesWritten + headerWriter.bytesWritten))) {
      this.stream.once('drain', () => {
        if (this.outgoingQueue.length > 0) {
          this.drainQueue();
        }
      });
    } else {
      process.nextTick(() => {
        if (this.outgoingQueue.length > 0) {
          this.drainQueue();
        }
      });
    }
  }

  /**
   * Resets the reader buffer and the RC4 instances.
   */
  private resetState(): void {
    this.sendRC4.reset();
    this.receiveRC4.reset();
  }

  private onReadable(): void {
    let readSize: number;
    if (this.header) {
      readSize = this.header.length - 5;
    } else {
      readSize = 5;
    }
    const buffer: Buffer = this.stream!.read(readSize);
    // TODO(thomas.crane): maybe assert Buffer.isBuffer(buffer) here.
    // The assertion may fail if this packetio was attached to a stream
    // that has had its encoding set.
    if (buffer !== null) {
      if (!this.header) {
        // parse header.
        const reader = new BufferReader(buffer);
        const length = reader.readInt32();
        const id = reader.readByte();
        this.header = { length, id };
      } else {
        // parse packet.
        this.receiveRC4.cipher(buffer);
        // get the type of this packet.
        const type = this.packetMap.getType(this.header.id);
        if (type !== undefined) {
          const listenerCount = this.listenerCount(type);
          if (listenerCount !== 0) {
            // construct and emit packet.
            const packet = createPacket(type);
            const reader = new BufferReader(buffer);
            packet.read(reader);
            this.emitPacket(packet);
          }
        }
      }
    }
  }
}

// tslint:disable:max-line-length
// method overloads for the event listeners.
export interface PacketIO {
  on(event: PacketType.FAILURE, listener: (packet: IncomingPackets.FailurePacket) => void): this;
  on(event: PacketType.ACCEPT_ARENA_DEATH, listener: (packet: OutgoingPackets.AcceptArenaDeathPacket) => void): this;
  on(event: PacketType.LOAD, listener: (packet: OutgoingPackets.LoadPacket) => void): this;
  on(event: PacketType.QUEST_REDEEM_RESPONSE, listener: (packet: IncomingPackets.QuestRedeemResponsePacket) => void): this;
  on(event: PacketType.TRADEACCEPTED, listener: (packet: IncomingPackets.TradeAcceptedPacket) => void): this;
  on(event: PacketType.GOTOACK, listener: (packet: OutgoingPackets.GotoAckPacket) => void): this;
  on(event: PacketType.PET_CHANGE_FORM_MSG, listener: (packet: OutgoingPackets.ReskinPetPacket) => void): this;
  on(event: PacketType.GUILDREMOVE, listener: (packet: OutgoingPackets.GuildRemovePacket) => void): this;
  on(event: PacketType.TRADEDONE, listener: (packet: IncomingPackets.TradeDonePacket) => void): this;
  on(event: PacketType.HELLO, listener: (packet: OutgoingPackets.HelloPacket) => void): this;
  on(event: PacketType.MOVE, listener: (packet: OutgoingPackets.MovePacket) => void): this;
  on(event: PacketType.SETCONDITION, listener: (packet: OutgoingPackets.SetConditionPacket) => void): this;
  on(event: PacketType.ACTIVEPETUPDATE, listener: (packet: IncomingPackets.ActivePetPacket) => void): this;
  on(event: PacketType.PONG, listener: (packet: OutgoingPackets.PongPacket) => void): this;
  on(event: PacketType.CANCELTRADE, listener: (packet: OutgoingPackets.CancelTradePacket) => void): this;
  on(event: PacketType.OTHERHIT, listener: (packet: OutgoingPackets.OtherHitPacket) => void): this;
  on(event: PacketType.IMMINENT_ARENA_WAVE, listener: (packet: IncomingPackets.ImminentArenaWavePacket) => void): this;
  on(event: PacketType.GLOBAL_NOTIFICATION, listener: (packet: IncomingPackets.GlobalNotificationPacket) => void): this;
  on(event: PacketType.TRADECHANGED, listener: (packet: IncomingPackets.TradeChangedPacket) => void): this;
  on(event: PacketType.PETYARDUPDATE, listener: (packet: IncomingPackets.PetYardUpdate) => void): this;
  on(event: PacketType.DAMAGE, listener: (packet: IncomingPackets.DamagePacket) => void): this;
  on(event: PacketType.CREATE_SUCCESS, listener: (packet: IncomingPackets.CreateSuccessPacket) => void): this;
  on(event: PacketType.QUEST_FETCH_ASK, listener: (packet: OutgoingPackets.QuestFetchAskPacket) => void): this;
  on(event: PacketType.TELEPORT, listener: (packet: OutgoingPackets.TeleportPacket) => void): this;
  on(event: PacketType.EVOLVE_PET, listener: (packet: IncomingPackets.EvolvedPetMessage) => void): this;
  on(event: PacketType.UPDATEACK, listener: (packet: OutgoingPackets.UpdateAckPacket) => void): this;
  on(event: PacketType.UPDATE, listener: (packet: IncomingPackets.UpdatePacket) => void): this;
  on(event: PacketType.INVITEDTOGUILD, listener: (packet: IncomingPackets.InvitedToGuildPacket) => void): this;
  on(event: PacketType.USEITEM, listener: (packet: OutgoingPackets.UseItemPacket) => void): this;
  on(event: PacketType.TRADESTART, listener: (packet: IncomingPackets.TradeStartPacket) => void): this;
  on(event: PacketType.CLAIM_LOGIN_REWARD_MSG, listener: (packet: OutgoingPackets.ClaimDailyRewardMessage) => void): this;
  on(event: PacketType.SHOWEFFECT, listener: (packet: IncomingPackets.ShowEffectPacket) => void): this;
  on(event: PacketType.DEATH, listener: (packet: IncomingPackets.DeathPacket) => void): this;
  on(event: PacketType.RESKIN, listener: (packet: OutgoingPackets.ReskinPacket) => void): this;
  on(event: PacketType.PLAYERTEXT, listener: (packet: OutgoingPackets.PlayerTextPacket) => void): this;
  on(event: PacketType.DELETE_PET, listener: (packet: IncomingPackets.DeletePetMessage) => void): this;
  on(event: PacketType.QUEST_REDEEM, listener: (packet: OutgoingPackets.QuestRedeemPacket) => void): this;
  on(event: PacketType.USEPORTAL, listener: (packet: OutgoingPackets.UsePortalPacket) => void): this;
  on(event: PacketType.KEY_INFO_RESPONSE, listener: (packet: IncomingPackets.KeyInfoResponsePacket) => void): this;
  on(event: PacketType.ACCEPTTRADE, listener: (packet: OutgoingPackets.AcceptTradePacket) => void): this;
  on(event: PacketType.RECONNECT, listener: (packet: IncomingPackets.ReconnectPacket) => void): this;
  on(event: PacketType.BUYRESULT, listener: (packet: IncomingPackets.BuyResultPacket) => void): this;
  on(event: PacketType.REQUESTTRADE, listener: (packet: OutgoingPackets.RequestTradePacket) => void): this;
  on(event: PacketType.PETUPGRADEREQUEST, listener: (packet: OutgoingPackets.PetUpgradeRequestPacket) => void): this;
  on(event: PacketType.SHOOTACK, listener: (packet: OutgoingPackets.ShootAckPacket) => void): this;
  on(event: PacketType.PLAYERHIT, listener: (packet: OutgoingPackets.PlayerHitPacket) => void): this;
  on(event: PacketType.ACTIVE_PET_UPDATE_REQUEST, listener: (packet: OutgoingPackets.ActivePetUpdateRequestPacket) => void): this;
  on(event: PacketType.PLAYSOUND, listener: (packet: IncomingPackets.PlaySoundPacket) => void): this;
  on(event: PacketType.PLAYERSHOOT, listener: (packet: OutgoingPackets.PlayerShootPacket) => void): this;
  on(event: PacketType.ESCAPE, listener: (packet: OutgoingPackets.EscapePacket) => void): this;
  on(event: PacketType.GUILDRESULT, listener: (packet: IncomingPackets.GuildResultPacket) => void): this;
  on(event: PacketType.NOTIFICATION, listener: (packet: IncomingPackets.NotificationPacket) => void): this;
  on(event: PacketType.VERIFY_EMAIL, listener: (packet: IncomingPackets.VerifyEmailPacket) => void): this;
  on(event: PacketType.GOTO, listener: (packet: IncomingPackets.GotoPacket) => void): this;
  on(event: PacketType.MAPINFO, listener: (packet: IncomingPackets.MapInfoPacket) => void): this;
  on(event: PacketType.INVDROP, listener: (packet: OutgoingPackets.InvDropPacket) => void): this;
  on(event: PacketType.ARENA_DEATH, listener: (packet: IncomingPackets.ArenaDeathPacket) => void): this;
  on(event: PacketType.ALLYSHOOT, listener: (packet: IncomingPackets.AllyShootPacket) => void): this;
  on(event: PacketType.SERVERPLAYERSHOOT, listener: (packet: IncomingPackets.ServerPlayerShootPacket) => void): this;
  on(event: PacketType.PASSWORD_PROMPT, listener: (packet: IncomingPackets.PasswordPromptPacket) => void): this;
  on(event: PacketType.FILE, listener: (packet: IncomingPackets.FilePacket) => void): this;
  on(event: PacketType.KEY_INFO_REQUEST, listener: (packet: OutgoingPackets.KeyInfoRequestPacket) => void): this;
  on(event: PacketType.QUEST_ROOM_MSG, listener: (packet: OutgoingPackets.GoToQuestRoomPacket) => void): this;
  on(event: PacketType.CHECKCREDITS, listener: (packet: OutgoingPackets.CheckCreditsPacket) => void): this;
  on(event: PacketType.ENEMYHIT, listener: (packet: OutgoingPackets.EnemyHitPacket) => void): this;
  on(event: PacketType.CREATE, listener: (packet: OutgoingPackets.CreatePacket) => void): this;
  on(event: PacketType.GUILDINVITE, listener: (packet: OutgoingPackets.GuildInvitePacket) => void): this;
  on(event: PacketType.ENTER_ARENA, listener: (packet: OutgoingPackets.EnterArenaPacket) => void): this;
  on(event: PacketType.PING, listener: (packet: IncomingPackets.PingPacket) => void): this;
  on(event: PacketType.EDITACCOUNTLIST, listener: (packet: OutgoingPackets.EditAccountListPacket) => void): this;
  on(event: PacketType.AOE, listener: (packet: IncomingPackets.AoePacket) => void): this;
  on(event: PacketType.ACCOUNTLIST, listener: (packet: IncomingPackets.AccountListPacket) => void): this;
  on(event: PacketType.BUY, listener: (packet: OutgoingPackets.BuyPacket) => void): this;
  on(event: PacketType.INVSWAP, listener: (packet: OutgoingPackets.InvSwapPacket) => void): this;
  on(event: PacketType.AOEACK, listener: (packet: OutgoingPackets.AoeAckPacket) => void): this;
  on(event: PacketType.PIC, listener: (packet: IncomingPackets.PicPacket) => void): this;
  on(event: PacketType.INVRESULT, listener: (packet: IncomingPackets.InvResultPacket) => void): this;
  on(event: PacketType.LOGIN_REWARD_MSG, listener: (packet: IncomingPackets.ClaimDailyRewardResponse) => void): this;
  on(event: PacketType.CHANGETRADE, listener: (packet: OutgoingPackets.ChangeTradePacket) => void): this;
  on(event: PacketType.TEXT, listener: (packet: IncomingPackets.TextPacket) => void): this;
  on(event: PacketType.QUESTOBJID, listener: (packet: IncomingPackets.QuestObjectIdPacket) => void): this;
  on(event: PacketType.QUEST_FETCH_RESPONSE, listener: (packet: IncomingPackets.QuestFetchResponsePacket) => void): this;
  on(event: PacketType.TRADEREQUESTED, listener: (packet: IncomingPackets.TradeRequestedPacket) => void): this;
  on(event: PacketType.HATCH_PET, listener: (packet: IncomingPackets.HatchPetMessage) => void): this;
  on(event: PacketType.GROUNDDAMAGE, listener: (packet: OutgoingPackets.GroundDamagePacket) => void): this;
  on(event: PacketType.ENEMYSHOOT, listener: (packet: IncomingPackets.EnemyShootPacket) => void): this;
  on(event: PacketType.CHOOSENAME, listener: (packet: OutgoingPackets.ChooseNamePacket) => void): this;
  on(event: PacketType.CLIENTSTAT, listener: (packet: IncomingPackets.ClientStatPacket) => void): this;
  on(event: PacketType.RESKIN_UNLOCK, listener: (packet: IncomingPackets.ReskinUnlockPacket) => void): this;
  on(event: PacketType.NAMERESULT, listener: (packet: IncomingPackets.NameResultPacket) => void): this;
  on(event: PacketType.JOINGUILD, listener: (packet: OutgoingPackets.JoinGuildPacket) => void): this;
  on(event: PacketType.NEWTICK, listener: (packet: IncomingPackets.NewTickPacket) => void): this;
  on(event: PacketType.SQUAREHIT, listener: (packet: OutgoingPackets.SquareHitPacket) => void): this;
  on(event: PacketType.CHANGEGUILDRANK, listener: (packet: OutgoingPackets.ChangeGuildRankPacket) => void): this;
  on(event: PacketType.NEW_ABILITY, listener: (packet: IncomingPackets.NewAbilityMessage) => void): this;
  on(event: PacketType.CREATEGUILD, listener: (packet: OutgoingPackets.CreateGuildPacket) => void): this;
  on(event: PacketType.PET_CHANGE_SKIN_MSG, listener: (packet: OutgoingPackets.ChangePetSkinPacket) => void): this;
  on(event: PacketType.REALM_HERO_LEFT_MSG, listener: (packet: IncomingPackets.RealmHeroesLeftPacket) => void): this;
  on(event: PacketType.RESET_DAILY_QUESTS, listener: (packet: OutgoingPackets.ResetDailyQuestsPacket) => void): this;
  on(event: 'error', listener: (err: Error) => void): this;
  on(event: string, listener: (data: Packet | Error) => void): this;
  once(event: PacketType.FAILURE, listener: (packet: IncomingPackets.FailurePacket) => void): this;
  once(event: PacketType.ACCEPT_ARENA_DEATH, listener: (packet: OutgoingPackets.AcceptArenaDeathPacket) => void): this;
  once(event: PacketType.LOAD, listener: (packet: OutgoingPackets.LoadPacket) => void): this;
  once(event: PacketType.QUEST_REDEEM_RESPONSE, listener: (packet: IncomingPackets.QuestRedeemResponsePacket) => void): this;
  once(event: PacketType.TRADEACCEPTED, listener: (packet: IncomingPackets.TradeAcceptedPacket) => void): this;
  once(event: PacketType.GOTOACK, listener: (packet: OutgoingPackets.GotoAckPacket) => void): this;
  once(event: PacketType.PET_CHANGE_FORM_MSG, listener: (packet: OutgoingPackets.ReskinPetPacket) => void): this;
  once(event: PacketType.GUILDREMOVE, listener: (packet: OutgoingPackets.GuildRemovePacket) => void): this;
  once(event: PacketType.TRADEDONE, listener: (packet: IncomingPackets.TradeDonePacket) => void): this;
  once(event: PacketType.HELLO, listener: (packet: OutgoingPackets.HelloPacket) => void): this;
  once(event: PacketType.MOVE, listener: (packet: OutgoingPackets.MovePacket) => void): this;
  once(event: PacketType.SETCONDITION, listener: (packet: OutgoingPackets.SetConditionPacket) => void): this;
  once(event: PacketType.ACTIVEPETUPDATE, listener: (packet: IncomingPackets.ActivePetPacket) => void): this;
  once(event: PacketType.PONG, listener: (packet: OutgoingPackets.PongPacket) => void): this;
  once(event: PacketType.CANCELTRADE, listener: (packet: OutgoingPackets.CancelTradePacket) => void): this;
  once(event: PacketType.OTHERHIT, listener: (packet: OutgoingPackets.OtherHitPacket) => void): this;
  once(event: PacketType.IMMINENT_ARENA_WAVE, listener: (packet: IncomingPackets.ImminentArenaWavePacket) => void): this;
  once(event: PacketType.GLOBAL_NOTIFICATION, listener: (packet: IncomingPackets.GlobalNotificationPacket) => void): this;
  once(event: PacketType.TRADECHANGED, listener: (packet: IncomingPackets.TradeChangedPacket) => void): this;
  once(event: PacketType.PETYARDUPDATE, listener: (packet: IncomingPackets.PetYardUpdate) => void): this;
  once(event: PacketType.DAMAGE, listener: (packet: IncomingPackets.DamagePacket) => void): this;
  once(event: PacketType.CREATE_SUCCESS, listener: (packet: IncomingPackets.CreateSuccessPacket) => void): this;
  once(event: PacketType.QUEST_FETCH_ASK, listener: (packet: OutgoingPackets.QuestFetchAskPacket) => void): this;
  once(event: PacketType.TELEPORT, listener: (packet: OutgoingPackets.TeleportPacket) => void): this;
  once(event: PacketType.EVOLVE_PET, listener: (packet: IncomingPackets.EvolvedPetMessage) => void): this;
  once(event: PacketType.UPDATEACK, listener: (packet: OutgoingPackets.UpdateAckPacket) => void): this;
  once(event: PacketType.UPDATE, listener: (packet: IncomingPackets.UpdatePacket) => void): this;
  once(event: PacketType.INVITEDTOGUILD, listener: (packet: IncomingPackets.InvitedToGuildPacket) => void): this;
  once(event: PacketType.USEITEM, listener: (packet: OutgoingPackets.UseItemPacket) => void): this;
  once(event: PacketType.TRADESTART, listener: (packet: IncomingPackets.TradeStartPacket) => void): this;
  once(event: PacketType.CLAIM_LOGIN_REWARD_MSG, listener: (packet: OutgoingPackets.ClaimDailyRewardMessage) => void): this;
  once(event: PacketType.SHOWEFFECT, listener: (packet: IncomingPackets.ShowEffectPacket) => void): this;
  once(event: PacketType.DEATH, listener: (packet: IncomingPackets.DeathPacket) => void): this;
  once(event: PacketType.RESKIN, listener: (packet: OutgoingPackets.ReskinPacket) => void): this;
  once(event: PacketType.PLAYERTEXT, listener: (packet: OutgoingPackets.PlayerTextPacket) => void): this;
  once(event: PacketType.DELETE_PET, listener: (packet: IncomingPackets.DeletePetMessage) => void): this;
  once(event: PacketType.QUEST_REDEEM, listener: (packet: OutgoingPackets.QuestRedeemPacket) => void): this;
  once(event: PacketType.USEPORTAL, listener: (packet: OutgoingPackets.UsePortalPacket) => void): this;
  once(event: PacketType.KEY_INFO_RESPONSE, listener: (packet: IncomingPackets.KeyInfoResponsePacket) => void): this;
  once(event: PacketType.ACCEPTTRADE, listener: (packet: OutgoingPackets.AcceptTradePacket) => void): this;
  once(event: PacketType.RECONNECT, listener: (packet: IncomingPackets.ReconnectPacket) => void): this;
  once(event: PacketType.BUYRESULT, listener: (packet: IncomingPackets.BuyResultPacket) => void): this;
  once(event: PacketType.REQUESTTRADE, listener: (packet: OutgoingPackets.RequestTradePacket) => void): this;
  once(event: PacketType.PETUPGRADEREQUEST, listener: (packet: OutgoingPackets.PetUpgradeRequestPacket) => void): this;
  once(event: PacketType.SHOOTACK, listener: (packet: OutgoingPackets.ShootAckPacket) => void): this;
  once(event: PacketType.PLAYERHIT, listener: (packet: OutgoingPackets.PlayerHitPacket) => void): this;
  once(event: PacketType.ACTIVE_PET_UPDATE_REQUEST, listener: (packet: OutgoingPackets.ActivePetUpdateRequestPacket) => void): this;
  once(event: PacketType.PLAYSOUND, listener: (packet: IncomingPackets.PlaySoundPacket) => void): this;
  once(event: PacketType.PLAYERSHOOT, listener: (packet: OutgoingPackets.PlayerShootPacket) => void): this;
  once(event: PacketType.ESCAPE, listener: (packet: OutgoingPackets.EscapePacket) => void): this;
  once(event: PacketType.GUILDRESULT, listener: (packet: IncomingPackets.GuildResultPacket) => void): this;
  once(event: PacketType.NOTIFICATION, listener: (packet: IncomingPackets.NotificationPacket) => void): this;
  once(event: PacketType.VERIFY_EMAIL, listener: (packet: IncomingPackets.VerifyEmailPacket) => void): this;
  once(event: PacketType.GOTO, listener: (packet: IncomingPackets.GotoPacket) => void): this;
  once(event: PacketType.MAPINFO, listener: (packet: IncomingPackets.MapInfoPacket) => void): this;
  once(event: PacketType.INVDROP, listener: (packet: OutgoingPackets.InvDropPacket) => void): this;
  once(event: PacketType.ARENA_DEATH, listener: (packet: IncomingPackets.ArenaDeathPacket) => void): this;
  once(event: PacketType.ALLYSHOOT, listener: (packet: IncomingPackets.AllyShootPacket) => void): this;
  once(event: PacketType.SERVERPLAYERSHOOT, listener: (packet: IncomingPackets.ServerPlayerShootPacket) => void): this;
  once(event: PacketType.PASSWORD_PROMPT, listener: (packet: IncomingPackets.PasswordPromptPacket) => void): this;
  once(event: PacketType.FILE, listener: (packet: IncomingPackets.FilePacket) => void): this;
  once(event: PacketType.KEY_INFO_REQUEST, listener: (packet: OutgoingPackets.KeyInfoRequestPacket) => void): this;
  once(event: PacketType.QUEST_ROOM_MSG, listener: (packet: OutgoingPackets.GoToQuestRoomPacket) => void): this;
  once(event: PacketType.CHECKCREDITS, listener: (packet: OutgoingPackets.CheckCreditsPacket) => void): this;
  once(event: PacketType.ENEMYHIT, listener: (packet: OutgoingPackets.EnemyHitPacket) => void): this;
  once(event: PacketType.CREATE, listener: (packet: OutgoingPackets.CreatePacket) => void): this;
  once(event: PacketType.GUILDINVITE, listener: (packet: OutgoingPackets.GuildInvitePacket) => void): this;
  once(event: PacketType.ENTER_ARENA, listener: (packet: OutgoingPackets.EnterArenaPacket) => void): this;
  once(event: PacketType.PING, listener: (packet: IncomingPackets.PingPacket) => void): this;
  once(event: PacketType.EDITACCOUNTLIST, listener: (packet: OutgoingPackets.EditAccountListPacket) => void): this;
  once(event: PacketType.AOE, listener: (packet: IncomingPackets.AoePacket) => void): this;
  once(event: PacketType.ACCOUNTLIST, listener: (packet: IncomingPackets.AccountListPacket) => void): this;
  once(event: PacketType.BUY, listener: (packet: OutgoingPackets.BuyPacket) => void): this;
  once(event: PacketType.INVSWAP, listener: (packet: OutgoingPackets.InvSwapPacket) => void): this;
  once(event: PacketType.AOEACK, listener: (packet: OutgoingPackets.AoeAckPacket) => void): this;
  once(event: PacketType.PIC, listener: (packet: IncomingPackets.PicPacket) => void): this;
  once(event: PacketType.INVRESULT, listener: (packet: IncomingPackets.InvResultPacket) => void): this;
  once(event: PacketType.LOGIN_REWARD_MSG, listener: (packet: IncomingPackets.ClaimDailyRewardResponse) => void): this;
  once(event: PacketType.CHANGETRADE, listener: (packet: OutgoingPackets.ChangeTradePacket) => void): this;
  once(event: PacketType.TEXT, listener: (packet: IncomingPackets.TextPacket) => void): this;
  once(event: PacketType.QUESTOBJID, listener: (packet: IncomingPackets.QuestObjectIdPacket) => void): this;
  once(event: PacketType.QUEST_FETCH_RESPONSE, listener: (packet: IncomingPackets.QuestFetchResponsePacket) => void): this;
  once(event: PacketType.TRADEREQUESTED, listener: (packet: IncomingPackets.TradeRequestedPacket) => void): this;
  once(event: PacketType.HATCH_PET, listener: (packet: IncomingPackets.HatchPetMessage) => void): this;
  once(event: PacketType.GROUNDDAMAGE, listener: (packet: OutgoingPackets.GroundDamagePacket) => void): this;
  once(event: PacketType.ENEMYSHOOT, listener: (packet: IncomingPackets.EnemyShootPacket) => void): this;
  once(event: PacketType.CHOOSENAME, listener: (packet: OutgoingPackets.ChooseNamePacket) => void): this;
  once(event: PacketType.CLIENTSTAT, listener: (packet: IncomingPackets.ClientStatPacket) => void): this;
  once(event: PacketType.RESKIN_UNLOCK, listener: (packet: IncomingPackets.ReskinUnlockPacket) => void): this;
  once(event: PacketType.NAMERESULT, listener: (packet: IncomingPackets.NameResultPacket) => void): this;
  once(event: PacketType.JOINGUILD, listener: (packet: OutgoingPackets.JoinGuildPacket) => void): this;
  once(event: PacketType.NEWTICK, listener: (packet: IncomingPackets.NewTickPacket) => void): this;
  once(event: PacketType.SQUAREHIT, listener: (packet: OutgoingPackets.SquareHitPacket) => void): this;
  once(event: PacketType.CHANGEGUILDRANK, listener: (packet: OutgoingPackets.ChangeGuildRankPacket) => void): this;
  once(event: PacketType.NEW_ABILITY, listener: (packet: IncomingPackets.NewAbilityMessage) => void): this;
  once(event: PacketType.CREATEGUILD, listener: (packet: OutgoingPackets.CreateGuildPacket) => void): this;
  once(event: PacketType.PET_CHANGE_SKIN_MSG, listener: (packet: OutgoingPackets.ChangePetSkinPacket) => void): this;
  once(event: PacketType.REALM_HERO_LEFT_MSG, listener: (packet: IncomingPackets.RealmHeroesLeftPacket) => void): this;
  once(event: PacketType.RESET_DAILY_QUESTS, listener: (packet: OutgoingPackets.ResetDailyQuestsPacket) => void): this;
  once(event: 'error', listener: (err: Error) => void): this;
  once(event: string, listener: (data: Packet | Error) => void): this;
}
