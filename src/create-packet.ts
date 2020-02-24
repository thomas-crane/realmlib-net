import { Packet } from './packet';
import { PacketType } from './packet-type';

import * as IncomingPackets from './packets/incoming';
import * as OutgoingPackets from './packets/outgoing';

/**
 * Creates the correct packet object for the given type.
 * @param type The type of packet to create.
 * @throws {Error} if the packet cannot be created.
 */
export function createPacket(type: PacketType.FAILURE): IncomingPackets.FailurePacket;
export function createPacket(type: PacketType.ACCEPT_ARENA_DEATH): OutgoingPackets.AcceptArenaDeathPacket;
export function createPacket(type: PacketType.LOAD): OutgoingPackets.LoadPacket;
export function createPacket(type: PacketType.QUEST_REDEEM_RESPONSE): IncomingPackets.QuestRedeemResponsePacket;
export function createPacket(type: PacketType.TRADEACCEPTED): IncomingPackets.TradeAcceptedPacket;
export function createPacket(type: PacketType.GOTOACK): OutgoingPackets.GotoAckPacket;
export function createPacket(type: PacketType.PET_CHANGE_FORM_MSG): OutgoingPackets.ReskinPetPacket;
export function createPacket(type: PacketType.GUILDREMOVE): OutgoingPackets.GuildRemovePacket;
export function createPacket(type: PacketType.TRADEDONE): IncomingPackets.TradeDonePacket;
export function createPacket(type: PacketType.HELLO): OutgoingPackets.HelloPacket;
export function createPacket(type: PacketType.MOVE): OutgoingPackets.MovePacket;
export function createPacket(type: PacketType.SETCONDITION): OutgoingPackets.SetConditionPacket;
export function createPacket(type: PacketType.ACTIVEPETUPDATE): IncomingPackets.ActivePetPacket;
export function createPacket(type: PacketType.PONG): OutgoingPackets.PongPacket;
export function createPacket(type: PacketType.CANCELTRADE): OutgoingPackets.CancelTradePacket;
export function createPacket(type: PacketType.OTHERHIT): OutgoingPackets.OtherHitPacket;
export function createPacket(type: PacketType.IMMINENT_ARENA_WAVE): IncomingPackets.ImminentArenaWavePacket;
export function createPacket(type: PacketType.GLOBAL_NOTIFICATION): IncomingPackets.GlobalNotificationPacket;
export function createPacket(type: PacketType.TRADECHANGED): IncomingPackets.TradeChangedPacket;
export function createPacket(type: PacketType.PETYARDUPDATE): IncomingPackets.PetYardUpdate;
export function createPacket(type: PacketType.DAMAGE): IncomingPackets.DamagePacket;
export function createPacket(type: PacketType.CREATE_SUCCESS): IncomingPackets.CreateSuccessPacket;
export function createPacket(type: PacketType.QUEST_FETCH_ASK): OutgoingPackets.QuestFetchAskPacket;
export function createPacket(type: PacketType.TELEPORT): OutgoingPackets.TeleportPacket;
export function createPacket(type: PacketType.EVOLVE_PET): IncomingPackets.EvolvedPetMessage;
export function createPacket(type: PacketType.UPDATEACK): OutgoingPackets.UpdateAckPacket;
export function createPacket(type: PacketType.UPDATE): IncomingPackets.UpdatePacket;
export function createPacket(type: PacketType.INVITEDTOGUILD): IncomingPackets.InvitedToGuildPacket;
export function createPacket(type: PacketType.USEITEM): OutgoingPackets.UseItemPacket;
export function createPacket(type: PacketType.TRADESTART): IncomingPackets.TradeStartPacket;
export function createPacket(type: PacketType.CLAIM_LOGIN_REWARD_MSG): OutgoingPackets.ClaimDailyRewardMessage;
export function createPacket(type: PacketType.SHOWEFFECT): IncomingPackets.ShowEffectPacket;
export function createPacket(type: PacketType.DEATH): IncomingPackets.DeathPacket;
export function createPacket(type: PacketType.RESKIN): OutgoingPackets.ReskinPacket;
export function createPacket(type: PacketType.PLAYERTEXT): OutgoingPackets.PlayerTextPacket;
export function createPacket(type: PacketType.DELETE_PET): IncomingPackets.DeletePetMessage;
export function createPacket(type: PacketType.QUEST_REDEEM): OutgoingPackets.QuestRedeemPacket;
export function createPacket(type: PacketType.USEPORTAL): OutgoingPackets.UsePortalPacket;
export function createPacket(type: PacketType.KEY_INFO_RESPONSE): IncomingPackets.KeyInfoResponsePacket;
export function createPacket(type: PacketType.ACCEPTTRADE): OutgoingPackets.AcceptTradePacket;
export function createPacket(type: PacketType.RECONNECT): IncomingPackets.ReconnectPacket;
export function createPacket(type: PacketType.BUYRESULT): IncomingPackets.BuyResultPacket;
export function createPacket(type: PacketType.REQUESTTRADE): OutgoingPackets.RequestTradePacket;
export function createPacket(type: PacketType.PETUPGRADEREQUEST): OutgoingPackets.PetUpgradeRequestPacket;
export function createPacket(type: PacketType.SHOOTACK): OutgoingPackets.ShootAckPacket;
export function createPacket(type: PacketType.PLAYERHIT): OutgoingPackets.PlayerHitPacket;
export function createPacket(type: PacketType.ACTIVE_PET_UPDATE_REQUEST): OutgoingPackets.ActivePetUpdateRequestPacket;
export function createPacket(type: PacketType.PLAYSOUND): IncomingPackets.PlaySoundPacket;
export function createPacket(type: PacketType.PLAYERSHOOT): OutgoingPackets.PlayerShootPacket;
export function createPacket(type: PacketType.ESCAPE): OutgoingPackets.EscapePacket;
export function createPacket(type: PacketType.GUILDRESULT): IncomingPackets.GuildResultPacket;
export function createPacket(type: PacketType.NOTIFICATION): IncomingPackets.NotificationPacket;
export function createPacket(type: PacketType.VERIFY_EMAIL): IncomingPackets.VerifyEmailPacket;
export function createPacket(type: PacketType.GOTO): IncomingPackets.GotoPacket;
export function createPacket(type: PacketType.MAPINFO): IncomingPackets.MapInfoPacket;
export function createPacket(type: PacketType.INVDROP): OutgoingPackets.InvDropPacket;
export function createPacket(type: PacketType.ARENA_DEATH): IncomingPackets.ArenaDeathPacket;
export function createPacket(type: PacketType.ALLYSHOOT): IncomingPackets.AllyShootPacket;
export function createPacket(type: PacketType.SERVERPLAYERSHOOT): IncomingPackets.ServerPlayerShootPacket;
export function createPacket(type: PacketType.PASSWORD_PROMPT): IncomingPackets.PasswordPromptPacket;
export function createPacket(type: PacketType.FILE): IncomingPackets.FilePacket;
export function createPacket(type: PacketType.KEY_INFO_REQUEST): OutgoingPackets.KeyInfoRequestPacket;
export function createPacket(type: PacketType.QUEST_ROOM_MSG): OutgoingPackets.GoToQuestRoomPacket;
export function createPacket(type: PacketType.CHECKCREDITS): OutgoingPackets.CheckCreditsPacket;
export function createPacket(type: PacketType.ENEMYHIT): OutgoingPackets.EnemyHitPacket;
export function createPacket(type: PacketType.CREATE): OutgoingPackets.CreatePacket;
export function createPacket(type: PacketType.GUILDINVITE): OutgoingPackets.GuildInvitePacket;
export function createPacket(type: PacketType.ENTER_ARENA): OutgoingPackets.EnterArenaPacket;
export function createPacket(type: PacketType.PING): IncomingPackets.PingPacket;
export function createPacket(type: PacketType.EDITACCOUNTLIST): OutgoingPackets.EditAccountListPacket;
export function createPacket(type: PacketType.AOE): IncomingPackets.AoePacket;
export function createPacket(type: PacketType.ACCOUNTLIST): IncomingPackets.AccountListPacket;
export function createPacket(type: PacketType.BUY): OutgoingPackets.BuyPacket;
export function createPacket(type: PacketType.INVSWAP): OutgoingPackets.InvSwapPacket;
export function createPacket(type: PacketType.AOEACK): OutgoingPackets.AoeAckPacket;
export function createPacket(type: PacketType.PIC): IncomingPackets.PicPacket;
export function createPacket(type: PacketType.INVRESULT): IncomingPackets.InvResultPacket;
export function createPacket(type: PacketType.LOGIN_REWARD_MSG): IncomingPackets.ClaimDailyRewardResponse;
export function createPacket(type: PacketType.CHANGETRADE): OutgoingPackets.ChangeTradePacket;
export function createPacket(type: PacketType.TEXT): IncomingPackets.TextPacket;
export function createPacket(type: PacketType.QUESTOBJID): IncomingPackets.QuestObjectIdPacket;
export function createPacket(type: PacketType.QUEST_FETCH_RESPONSE): IncomingPackets.QuestFetchResponsePacket;
export function createPacket(type: PacketType.TRADEREQUESTED): IncomingPackets.TradeRequestedPacket;
export function createPacket(type: PacketType.HATCH_PET): IncomingPackets.HatchPetMessage;
export function createPacket(type: PacketType.GROUNDDAMAGE): OutgoingPackets.GroundDamagePacket;
export function createPacket(type: PacketType.ENEMYSHOOT): IncomingPackets.EnemyShootPacket;
export function createPacket(type: PacketType.CHOOSENAME): OutgoingPackets.ChooseNamePacket;
export function createPacket(type: PacketType.CLIENTSTAT): IncomingPackets.ClientStatPacket;
export function createPacket(type: PacketType.RESKIN_UNLOCK): IncomingPackets.ReskinUnlockPacket;
export function createPacket(type: PacketType.NAMERESULT): IncomingPackets.NameResultPacket;
export function createPacket(type: PacketType.JOINGUILD): OutgoingPackets.JoinGuildPacket;
export function createPacket(type: PacketType.NEWTICK): IncomingPackets.NewTickPacket;
export function createPacket(type: PacketType.SQUAREHIT): OutgoingPackets.SquareHitPacket;
export function createPacket(type: PacketType.CHANGEGUILDRANK): OutgoingPackets.ChangeGuildRankPacket;
export function createPacket(type: PacketType.NEW_ABILITY): IncomingPackets.NewAbilityMessage;
export function createPacket(type: PacketType.CREATEGUILD): OutgoingPackets.CreateGuildPacket;
export function createPacket(type: PacketType.PET_CHANGE_SKIN_MSG): OutgoingPackets.ChangePetSkinPacket;
export function createPacket(type: PacketType.REALM_HERO_LEFT_MSG): IncomingPackets.RealmHeroesLeftPacket;
export function createPacket(type: PacketType.RESET_DAILY_QUESTS): OutgoingPackets.ResetDailyQuestsPacket;
export function createPacket(type: PacketType): Packet;
export function createPacket(type: PacketType): Packet {
  if (typeof type !== 'string') {
    throw new TypeError(`Parameter "type" must be a string, not ${typeof type}`);
  }
  if (!PacketType[type]) {
    throw new Error(`Parameter "type" must be a valid packet type, not "${type}"`);
  }
  switch (type) {
    case PacketType.FAILURE:
      return new IncomingPackets.FailurePacket();
    case PacketType.ACCEPT_ARENA_DEATH:
      return new OutgoingPackets.AcceptArenaDeathPacket();
    case PacketType.LOAD:
      return new OutgoingPackets.LoadPacket();
    case PacketType.QUEST_REDEEM_RESPONSE:
      return new IncomingPackets.QuestRedeemResponsePacket();
    case PacketType.TRADEACCEPTED:
      return new IncomingPackets.TradeAcceptedPacket();
    case PacketType.GOTOACK:
      return new OutgoingPackets.GotoAckPacket();
    case PacketType.PET_CHANGE_FORM_MSG:
      return new OutgoingPackets.ReskinPetPacket();
    case PacketType.GUILDREMOVE:
      return new OutgoingPackets.GuildRemovePacket();
    case PacketType.TRADEDONE:
      return new IncomingPackets.TradeDonePacket();
    case PacketType.HELLO:
      return new OutgoingPackets.HelloPacket();
    case PacketType.MOVE:
      return new OutgoingPackets.MovePacket();
    case PacketType.SETCONDITION:
      return new OutgoingPackets.SetConditionPacket();
    case PacketType.ACTIVEPETUPDATE:
      return new IncomingPackets.ActivePetPacket();
    case PacketType.PONG:
      return new OutgoingPackets.PongPacket();
    case PacketType.CANCELTRADE:
      return new OutgoingPackets.CancelTradePacket();
    case PacketType.OTHERHIT:
      return new OutgoingPackets.OtherHitPacket();
    case PacketType.IMMINENT_ARENA_WAVE:
      return new IncomingPackets.ImminentArenaWavePacket();
    case PacketType.GLOBAL_NOTIFICATION:
      return new IncomingPackets.GlobalNotificationPacket();
    case PacketType.TRADECHANGED:
      return new IncomingPackets.TradeChangedPacket();
    case PacketType.PETYARDUPDATE:
      return new IncomingPackets.PetYardUpdate();
    case PacketType.DAMAGE:
      return new IncomingPackets.DamagePacket();
    case PacketType.CREATE_SUCCESS:
      return new IncomingPackets.CreateSuccessPacket();
    case PacketType.QUEST_FETCH_ASK:
      return new OutgoingPackets.QuestFetchAskPacket();
    case PacketType.TELEPORT:
      return new OutgoingPackets.TeleportPacket();
    case PacketType.EVOLVE_PET:
      return new IncomingPackets.EvolvedPetMessage();
    case PacketType.UPDATEACK:
      return new OutgoingPackets.UpdateAckPacket();
    case PacketType.UPDATE:
      return new IncomingPackets.UpdatePacket();
    case PacketType.INVITEDTOGUILD:
      return new IncomingPackets.InvitedToGuildPacket();
    case PacketType.USEITEM:
      return new OutgoingPackets.UseItemPacket();
    case PacketType.TRADESTART:
      return new IncomingPackets.TradeStartPacket();
    case PacketType.CLAIM_LOGIN_REWARD_MSG:
      return new OutgoingPackets.ClaimDailyRewardMessage();
    case PacketType.SHOWEFFECT:
      return new IncomingPackets.ShowEffectPacket();
    case PacketType.DEATH:
      return new IncomingPackets.DeathPacket();
    case PacketType.RESKIN:
      return new OutgoingPackets.ReskinPacket();
    case PacketType.PLAYERTEXT:
      return new OutgoingPackets.PlayerTextPacket();
    case PacketType.DELETE_PET:
      return new IncomingPackets.DeletePetMessage();
    case PacketType.QUEST_REDEEM:
      return new OutgoingPackets.QuestRedeemPacket();
    case PacketType.USEPORTAL:
      return new OutgoingPackets.UsePortalPacket();
    case PacketType.KEY_INFO_RESPONSE:
      return new IncomingPackets.KeyInfoResponsePacket();
    case PacketType.ACCEPTTRADE:
      return new OutgoingPackets.AcceptTradePacket();
    case PacketType.RECONNECT:
      return new IncomingPackets.ReconnectPacket();
    case PacketType.BUYRESULT:
      return new IncomingPackets.BuyResultPacket();
    case PacketType.REQUESTTRADE:
      return new OutgoingPackets.RequestTradePacket();
    case PacketType.PETUPGRADEREQUEST:
      return new OutgoingPackets.PetUpgradeRequestPacket();
    case PacketType.SHOOTACK:
      return new OutgoingPackets.ShootAckPacket();
    case PacketType.PLAYERHIT:
      return new OutgoingPackets.PlayerHitPacket();
    case PacketType.ACTIVE_PET_UPDATE_REQUEST:
      return new OutgoingPackets.ActivePetUpdateRequestPacket();
    case PacketType.PLAYSOUND:
      return new IncomingPackets.PlaySoundPacket();
    case PacketType.PLAYERSHOOT:
      return new OutgoingPackets.PlayerShootPacket();
    case PacketType.ESCAPE:
      return new OutgoingPackets.EscapePacket();
    case PacketType.GUILDRESULT:
      return new IncomingPackets.GuildResultPacket();
    case PacketType.NOTIFICATION:
      return new IncomingPackets.NotificationPacket();
    case PacketType.VERIFY_EMAIL:
      return new IncomingPackets.VerifyEmailPacket();
    case PacketType.GOTO:
      return new IncomingPackets.GotoPacket();
    case PacketType.MAPINFO:
      return new IncomingPackets.MapInfoPacket();
    case PacketType.INVDROP:
      return new OutgoingPackets.InvDropPacket();
    case PacketType.ARENA_DEATH:
      return new IncomingPackets.ArenaDeathPacket();
    case PacketType.ALLYSHOOT:
      return new IncomingPackets.AllyShootPacket();
    case PacketType.SERVERPLAYERSHOOT:
      return new IncomingPackets.ServerPlayerShootPacket();
    case PacketType.PASSWORD_PROMPT:
      return new IncomingPackets.PasswordPromptPacket();
    case PacketType.FILE:
      return new IncomingPackets.FilePacket();
    case PacketType.KEY_INFO_REQUEST:
      return new OutgoingPackets.KeyInfoRequestPacket();
    case PacketType.QUEST_ROOM_MSG:
      return new OutgoingPackets.GoToQuestRoomPacket();
    case PacketType.CHECKCREDITS:
      return new OutgoingPackets.CheckCreditsPacket();
    case PacketType.ENEMYHIT:
      return new OutgoingPackets.EnemyHitPacket();
    case PacketType.CREATE:
      return new OutgoingPackets.CreatePacket();
    case PacketType.GUILDINVITE:
      return new OutgoingPackets.GuildInvitePacket();
    case PacketType.ENTER_ARENA:
      return new OutgoingPackets.EnterArenaPacket();
    case PacketType.PING:
      return new IncomingPackets.PingPacket();
    case PacketType.EDITACCOUNTLIST:
      return new OutgoingPackets.EditAccountListPacket();
    case PacketType.AOE:
      return new IncomingPackets.AoePacket();
    case PacketType.ACCOUNTLIST:
      return new IncomingPackets.AccountListPacket();
    case PacketType.BUY:
      return new OutgoingPackets.BuyPacket();
    case PacketType.INVSWAP:
      return new OutgoingPackets.InvSwapPacket();
    case PacketType.AOEACK:
      return new OutgoingPackets.AoeAckPacket();
    case PacketType.PIC:
      return new IncomingPackets.PicPacket();
    case PacketType.INVRESULT:
      return new IncomingPackets.InvResultPacket();
    case PacketType.LOGIN_REWARD_MSG:
      return new IncomingPackets.ClaimDailyRewardResponse();
    case PacketType.CHANGETRADE:
      return new OutgoingPackets.ChangeTradePacket();
    case PacketType.TEXT:
      return new IncomingPackets.TextPacket();
    case PacketType.QUESTOBJID:
      return new IncomingPackets.QuestObjectIdPacket();
    case PacketType.QUEST_FETCH_RESPONSE:
      return new IncomingPackets.QuestFetchResponsePacket();
    case PacketType.TRADEREQUESTED:
      return new IncomingPackets.TradeRequestedPacket();
    case PacketType.HATCH_PET:
      return new IncomingPackets.HatchPetMessage();
    case PacketType.GROUNDDAMAGE:
      return new OutgoingPackets.GroundDamagePacket();
    case PacketType.ENEMYSHOOT:
      return new IncomingPackets.EnemyShootPacket();
    case PacketType.CHOOSENAME:
      return new OutgoingPackets.ChooseNamePacket();
    case PacketType.CLIENTSTAT:
      return new IncomingPackets.ClientStatPacket();
    case PacketType.RESKIN_UNLOCK:
      return new IncomingPackets.ReskinUnlockPacket();
    case PacketType.NAMERESULT:
      return new IncomingPackets.NameResultPacket();
    case PacketType.JOINGUILD:
      return new OutgoingPackets.JoinGuildPacket();
    case PacketType.NEWTICK:
      return new IncomingPackets.NewTickPacket();
    case PacketType.SQUAREHIT:
      return new OutgoingPackets.SquareHitPacket();
    case PacketType.CHANGEGUILDRANK:
      return new OutgoingPackets.ChangeGuildRankPacket();
    case PacketType.NEW_ABILITY:
      return new IncomingPackets.NewAbilityMessage();
    case PacketType.CREATEGUILD:
      return new OutgoingPackets.CreateGuildPacket();
    case PacketType.PET_CHANGE_SKIN_MSG:
      return new OutgoingPackets.ChangePetSkinPacket();
    case PacketType.REALM_HERO_LEFT_MSG:
      return new IncomingPackets.RealmHeroesLeftPacket();
    case PacketType.RESET_DAILY_QUESTS:
      return new OutgoingPackets.ResetDailyQuestsPacket();
  }
}
