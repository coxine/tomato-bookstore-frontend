import { DarkModeRounded, LightModeRounded } from '@mui/icons-material'
import { IconButton, IconButtonProps, useColorScheme } from '@mui/joy'
import { useColorScheme as useMUIColorScheme } from '@mui/material'
import React, { useEffect } from 'react'

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props
  const { mode, setMode } = useColorScheme()
  const { setMode: setMuiMode } = useMUIColorScheme()
  const [mounted, setMounted] = React.useState(false)

  useEffect(() => {
    if (mounted) {
      setMuiMode(mode === 'light' ? 'light' : 'dark')
    }
  }, [mode, setMuiMode, mounted])

  useEffect(() => {
    setMounted(true)
    setMuiMode(mode === 'light' ? 'light' : 'dark')
  }, [mode, setMuiMode])

  const handleToggleMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    setMuiMode(newMode)

    localStorage.setItem('theme-mode', newMode)
    onClick?.(event)
  }

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={handleToggleMode}
      {...other}
    >
      {mode === 'light' ? <DarkModeRounded /> : <LightModeRounded />}
    </IconButton>
  )
}

export default ColorSchemeToggle
