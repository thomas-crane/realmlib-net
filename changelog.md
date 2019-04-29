# Changelog

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
