import { ArrowBack, ArrowForward, Menu as MenuIcon } from '@mui/icons-material'
import {
  Typography,
  TypographySystem,
  Box,
  Select,
  Option,
  ColorPaletteProp,
  TypographyPropsColorOverrides,
  Button,
  Dropdown,
  MenuButton,
  MenuItem,
  Menu,
} from '@mui/joy'
import { OverridableStringUnion } from '@mui/types'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import MainLayout from '../../components/layouts/MainLayout'
import { Chapter } from '../../types/chapter'

const themeColors: { value: OverridableStringUnion<ColorPaletteProp, TypographyPropsColorOverrides>, name: string }[] = [
  { value: 'primary', name: '墨染青花' },
  { value: 'warning', name: '落日余晖' },
  { value: 'danger', name: '胭脂红尘' },
  { value: 'neutral', name: '水墨山川' },
  { value: 'success', name: '翠竹清风' }
]

const fontSizes: { value: keyof TypographySystem, name: string }[] = [
  { value: 'body-lg', name: '大' },
  { value: 'body-md', name: '中' },
  { value: 'body-sm', name: '小' },
  { value: 'body-xs', name: '特小' }
]

// Helper function to convert text with newlines to JSX elements with proper line breaks
const renderTextWithLineBreaks = (text: string) => {
  return text.split('\n').map((line, index, array) => (
    <Typography key={index}>
      {line}
      <br />
      {index < (array.length - 1) && (<br />)}
    </Typography>
  ));
};

export default function ChapterReader() {
  const { chapterId } = useParams()
  console.log('chapterId', chapterId)
  const [fontSize, setFontSize] = useState<keyof TypographySystem>('body-md')
  const [themeColor, setThemeColor] = useState<OverridableStringUnion<ColorPaletteProp, TypographyPropsColorOverrides>>('neutral')

  const chapter: Chapter = { // TODO 获取章节详情
    id: 1001,
    name: '第1章',
    content:
      `他赠我很无力的一个相拥
却是他拥有的所有
十七岁那年搁浅我 一生的心动
经年之后 我富有一切自由
可以亲吻可以情衷
独缺少十七岁某某
于是一切富有都贫穷`,
    state: 'FREE',
    productId: 15,
    previous: 1000,
    next: 1002,
  }

  const bookChapters: Chapter[] = [ // TODO 获取章节列表
    {
      id: 1000,
      name: '序章',
      state: 'FREE',
      productId: 15,
    },
    {
      id: 1001,
      name: '第1章',
      state: 'FREE',
      productId: 15,
    },
    {
      id: 1002,
      name: '第11451412章',
      state: 'CHARGED',
      productId: 15,
    },
    {
      id: 1003,
      name: '第3章',
      state: 'LOCKED',
      productId: 15,
    }
  ]

  return (
    <MainLayout
      title="章节阅读"
      breadcrumbsItems={[
        { label: '购买书籍', link: '/books' },
        { label: '书籍详情', link: `/books/${chapter.productId}` },
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          pl: { xs: 0, md: 6 },
          mb: 2,
          gap: 2,
        }}
      >
        <Typography level="h3">{chapter.name}</Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          width: { xs: '100%', sm: 'auto' },
          justifyContent: { xs: 'space-between', sm: 'flex-end' }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography level="body-sm">字体</Typography>
            <Select
              value={fontSize}
              onChange={(_, value) =>
                setFontSize(value as keyof TypographySystem)
              }
              size="sm"
              sx={{ minWidth: 80 }}
            >
              {fontSizes.map((size) => (
                <Option key={size.value} value={size.value}>
                  <Typography level={size.value}>{size.name}</Typography>
                </Option>
              ))}
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography level="body-sm">主题</Typography>
            <Select
              value={themeColor}
              onChange={(_, value) => setThemeColor(value as ColorPaletteProp)}
              size="sm"
              sx={{ minWidth: 100 }}
            >
              {themeColors.map((theme) => (
                <Option key={theme.value} value={theme.value}>
                  <Typography color={theme.value} level="body-sm" variant="soft">
                    {theme.name}
                  </Typography>
                </Option>
              ))}
            </Select>
          </Box>
        </Box>
      </Box>
      <Typography
        level={fontSize}
        color={themeColor}
        sx={{ mb: 1, px: { xs: 1, md: 6 }, py: 2, borderRadius: 8 }}
        variant="soft"
      >
        {renderTextWithLineBreaks(chapter.content ?? "")}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
          gap: 2,
        }}
      >
        <Button
          component={Link}
          to={`/chapters/${chapter.previous}`}
          disabled={!chapter.previous}
          variant='soft'
          startDecorator={<ArrowBack />}
          size='sm'
        >
          上一章
        </Button>
        <Dropdown>
          <MenuButton variant="outlined" startDecorator={<MenuIcon />} size='sm'
          >章节列表</MenuButton>
          <Menu>
            {bookChapters.map((ch) => (
              <MenuItem
                key={ch.id}
                component={Link}
                to={`/chapters/${ch.id}`}
              >
                {ch.name}
              </MenuItem>
            ))}
          </Menu>
        </Dropdown>
        <Button
          component={Link}
          to={`/chapters/${chapter.next}`}
          disabled={!chapter.next}
          variant='soft'
          endDecorator={<ArrowForward />}
          size='sm'

        >
          下一章
        </Button>
      </Box>
    </MainLayout>
  )
}
