// https://react-svgr.com/playground/
import * as React from 'react'

const Logo = (props) => (
  <img src="/favicon.png" width="30" height="30" alt="Logo" draggable="false" onContextMenu={e => e.preventDefault()} onTouchStart={e => e.preventDefault()} />
)

export default Logo
