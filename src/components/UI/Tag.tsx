import {
  ColorPaletteProp,
  Typography,
  TypographyPropsColorOverrides,
} from '@mui/joy'
import { OverridableStringUnion } from '@mui/types'

export interface TagProps {
  color?: OverridableStringUnion<
    ColorPaletteProp,
    TypographyPropsColorOverrides
  >
  fontSize?: string | number
  text: string
}

export default function Tag({
  color = 'primary',
  fontSize = 'sm',
  text,
}: TagProps) {
  return (
    <Typography
      variant="soft"
      level="body-sm"
      color={color}
      sx={{
        fontSize,
        px: 1.5,
        py: 0.5,
        my: 0.3,
        borderRadius: '9999px',
        display: 'inline-block',
        lineHeight: 1,
      }}
    >
      {text}
    </Typography>
  )
}
