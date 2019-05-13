# Changelog

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
