import { Button, IconButton, Tooltip } from '@mui/joy'
import { Link } from 'react-router-dom'

import { NavigationItem } from '../../config/navigationConfig'

interface NavigationButtonProps {
  item: NavigationItem
  variant?: 'button' | 'icon'
  onClick?: () => void
}

export default function NavigationButton({
  item,
  variant = 'button',
  onClick,
}: NavigationButtonProps) {
  if (variant === 'icon') {
    return (
      <Tooltip key={item.path} title={item.label} placement="bottom">
        <IconButton
          component={Link}
          to={item.path}
          variant="soft"
          color="neutral"
          size="sm"
          sx={{ borderRadius: 'sm' }}
          onClick={onClick}
        >
          {item.icon}
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Button
      key={item.path}
      component={Link}
      to={item.path}
      variant="soft"
      color="primary"
      size="sm"
      startDecorator={item.icon}
      onClick={onClick}
      sx={{ justifyContent: 'flex-start' }}
    >
      {item.label}
    </Button>
  )
}
