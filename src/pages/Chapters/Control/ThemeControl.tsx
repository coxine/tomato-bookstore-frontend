import { ColorLens, FormatSize } from '@mui/icons-material'
import {
  Dropdown,
  MenuButton,
  MenuItem,
  Menu,
  Box,
  ColorPaletteProp,
  TypographySystem,
} from '@mui/joy'

export default function ThemeControl({
  setFontSize,
  setThemeColor,
}: {
  setFontSize: (value: keyof TypographySystem) => void
  setThemeColor: (value: ColorPaletteProp) => void
}) {
  const fontSizes: { value: keyof TypographySystem; name: string }[] = [
    { value: 'body-lg', name: '大' },
    { value: 'body-md', name: '中' },
    { value: 'body-sm', name: '小' },
    { value: 'body-xs', name: '特小' },
  ]

  const themeColors: { value: ColorPaletteProp; name: string }[] = [
    { value: 'primary', name: '青花' },
    { value: 'warning', name: '余晖' },
    { value: 'danger', name: '胭脂' },
    { value: 'neutral', name: '水墨' },
    { value: 'success', name: '翠竹' },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 1,
        width: { xs: '100%', sm: 'auto' },
      }}
    >
      <Dropdown>
        <MenuButton
          size="sm"
          variant="outlined"
          startDecorator={<FormatSize />}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          调整字体
        </MenuButton>
        <Menu>
          {fontSizes.map((size) => (
            <MenuItem key={size.value} onClick={() => setFontSize(size.value)}>
              {size.name}
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>
      <Dropdown>
        <MenuButton
          size="sm"
          variant="outlined"
          startDecorator={<ColorLens />}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          调整主题
        </MenuButton>
        <Menu>
          {themeColors.map((theme) => (
            <MenuItem
              key={theme.value}
              onClick={() => setThemeColor(theme.value)}
              color={theme.value}
            >
              {theme.name}
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>
    </Box>
  )
}
