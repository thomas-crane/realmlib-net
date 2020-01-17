import { Packet } from './packet';
import { PacketType } from './packet-type';

import * as IncomingPackets from './packets/incoming';
import * as OutgoingPackets from './packets/outgoing';

/**
 * Creates the correct packet object for the given type.
 * @param type The type of packet to create.
 * @throws {Error} if the packet cannot be created.
 */
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
  throw new Error(`Unknown packet type: ${type}`);
}
