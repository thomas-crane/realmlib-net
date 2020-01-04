# Changelog

## [3.1.4] - 2020-01-04

+ Replaced hardcoded value in hello packet with variable.

## [3.1.3] - 2019-09-21

### Fixed

+ Synchronised GitHub version with npmjs version.

## [3.1.2] - 2019-09-21

### Fixed

+ Added missing packet fields to the create packet and the load packet.

## [3.1.1] - 2019-07-03

### Fixed

+ The PacketIO state is now reset when a new socket is attached. This is necessary in cases where the socket is already connected when it is attached.

## [3.1.0] - 2019-07-02

### Added

+ Added packet definitions for the following packets
  + `PicPacket`
  + `FilePacket`
  + `PlaySoundPacket`

## [3.0.4] - 2019-07-02

### Fixed

+ Fixed incorrect write implementation of the text packet.

## [3.0.3] - 2019-07-02

### Fixed

+ Updated the reader `DEFAULT_SIZE` const to match the recent fix.

## [3.0.2] - 2019-07-02

### Fixed

+ Fixed a problem where trying to lookup a packet with an ID of 0 would fail.
+ Fixed a problem where the IO would mistake an UpdateAck packet for a packet header.

## [3.0.1] - 2019-06-21

### Added

+ The `ActivePetUpdateType` enum. The `commandType` property of the `ActivePetUpdateRequestPacket` now uses this enum as its type.

## [3.0.0] - 2019-05-19

### Added

+ The `createPacket` function. This is the exact same as the old `Packets.create` method.

### Changed

+ The PacketIO no longer emits a `'packet'` event when any packet is received.
+ Packets will not be created unless there is a packet listener for that packet type.
+ `Packets.create` (now `createPacket`) will throw an error if the requested packet type is unknown.

### Removed

+ The static `Packets` class has been removed.

## [2.2.6] - 2019-05-14

### Fixed

+ Fixed the wrong data type being used in the EnemyHitPacket.

## [2.2.5] - 2019-05-13

### Added

+ Added auto generated api docs using [TypeDoc.](https://typedoc.org/)

### Fixed

+ Fixed the wrong data type being used in the OtherHitPacket.

## [2.2.4] - 2019-05-06

### Fixed

+ Stopped the PacketIO from attempting to remove event listeners from an undefined socket.

## [2.2.3] - 2019-05-06

### Fixed

+ Stopped the PacketIO from sending a packet even after encountering a fatal error.

## [2.2.2] - 2019-05-02

### Fixed

+ Added the missing armorPierce value to the AoE packet.

## [2.2.1] - 2019-04-29

### Fixed

+ Fixed a bug where the EnemyShootPacket would sometimes read incorrect values for the number of shots and the angle inc.

## [2.2.0] - 2019-04-23

### Added

+ Added the `RealmHeroesLeft` packet.
+ Added the `ResetDailyQuests` packet.

## [2.1.0] - 2019-04-04

### Changed

+ Made `WorldPosData` more generic.

## [2.0.0] - 2019-04-04

### Added

+ Added new packets.

### Changed

+ Renamed the `Point` class to `WorldPosData` to be more consistent with RotMG. This breaks any code which referred to the Point class.

## [1.0.0] - 2019-02-14

+ Initial release.
