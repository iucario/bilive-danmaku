import { animated, useSpring } from 'react-spring'
import { CmdType } from '../MsgModel'
import MsgConnectSuccess from './MsgConnectSuccess'
import MsgConnecting from './MsgConnecting'
import MsgDanmu from './MsgDanmu'
import MsgDisconnected from './MsgDisconnected'
import MsgGuardBuy from './MsgGuardBuy'
import MsgGuardBuySystem from './MsgGuardBuySystem'
import MsgInterActWord from './MsgInterActWord'
import MsgLive from './MsgLive'
import MsgRoomBlock from './MsgRoomBlock'
import MsgSendGift from './MsgSendGift'
import MsgSuperChatCard from './MsgSuperChatCard'
import MsgWelcome from './MsgWelcome'
import MsgWelcomeGuard from './MsgWelcomeGuard'

function FadeInUp({ children }: any) {
  const props = useSpring({
    from: {
      transform: 'translate3d(0, 100%, 0)',
      opacity: 0,
    },
    to: {
      transform: 'translate3d(0, 0, 0)',
      opacity: 1,
    },
  })
  return <animated.div style={props}>{children}</animated.div>
}

type MsgEntityProps = DanmakuDataFormatted & {
  cmd: string
  key: string
  showTransition: boolean
  data?: any
  showGift?: boolean
}

export default function MsgEntity(props: MsgEntityProps) {
  const { cmd, showTransition, showGift = false } = props
  let Msg = null
  switch (cmd) {
    case CmdType.DANMU_MSG:
      Msg = <MsgDanmu {...(props as DanmakuMsg)} />
      break
    case CmdType.SEND_GIFT:
      if (showGift) {
        Msg = <MsgSendGift {...(props as DanmakuGift)} />
      }
      break
    case CmdType.CONNECTING:
      Msg = <MsgConnecting />
      break
    case CmdType.DISCONNECTED:
      Msg = <MsgDisconnected />
      break
    case CmdType.CONNECT_SUCCESS:
      Msg = <MsgConnectSuccess />
      break
    case CmdType.SUPER_CHAT_MESSAGE:
      Msg = <MsgSuperChatCard msg={props.data} style={{ marginTop: 10 }} />
      break
    case CmdType.LIVE:
      Msg = <MsgLive />
      break
    case CmdType.WELCOME:
      Msg = <MsgWelcome {...(props as MsgWelcome)} />
      break
    case CmdType.WELCOME_GUARD:
      Msg = <MsgWelcomeGuard {...(props as MsgWelcomeGuard)} />
      break
    case CmdType.INTERACT_WORD:
      if (showGift) {
        Msg = <MsgInterActWord {...(props as MsgInterActWordMsg)} />
      }
      break
    case CmdType.GUARD_BUY:
      Msg = [
        <MsgGuardBuy {...(props as GuardBuyMsg)} key="GuardBuy-0" />,
        <MsgGuardBuySystem {...(props as GuardBuyMsg)} key="GuardBuy-1" />,
      ]
      break
    case CmdType.ROOM_BLOCK_MSG:
      Msg = <MsgRoomBlock {...(props as MsgRoomBlockMsg)} />
      break
    default:
      return null
  }
  return showTransition ? <FadeInUp>{Msg}</FadeInUp> : Msg
}
