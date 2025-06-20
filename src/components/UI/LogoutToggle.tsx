import { ExitToApp } from '@mui/icons-material'
import { IconButton, IconButtonProps, Tooltip } from '@mui/joy'
import React from 'react'

const exitLogin = () => {
  sessionStorage.removeItem('isLoggedIn')
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('username')
  sessionStorage.removeItem('role')
  window.location.href = '/'
}

function LogoutToggle(props: IconButtonProps) {
  const { onClick, ...other } = props

  const handleLogOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    exitLogin()
    onClick?.(event)
  }

  return (
    <Tooltip title="退出登录">
      <IconButton
        aria-label="logout"
        size="sm"
        variant="soft"
        onClick={handleLogOut}
        {...other}
      >
        <ExitToApp />
      </IconButton>
    </Tooltip>
  )
}

export default LogoutToggle
