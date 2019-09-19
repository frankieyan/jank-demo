import styled, { keyframes } from 'styled-components'
import { ReactComponent as LoaderImg} from './assets/loader_img.svg'

const rotating = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Loader = styled(LoaderImg)`
  width: 24px;
  height: 24px;
  animation: ${rotating} 1.4s linear infinite;
`

export { Loader }
