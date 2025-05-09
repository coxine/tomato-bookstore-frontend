import { ArrowBack, ArrowForward, Menu as MenuIcon } from '@mui/icons-material'
import {
  Button,
  Dropdown,
  MenuButton,
  MenuItem,
  Menu,
  ButtonGroup,
} from '@mui/joy'
import { Link } from 'react-router-dom'

import { Chapter } from '../../../types/chapter'

export default function ChapterControl({
  chapter,
  bookChapters,
}: {
  chapter: Chapter
  bookChapters: Chapter[]
}) {
  return (
    <ButtonGroup variant="soft" color="primary">
      <Button
        component={Link}
        to={`/chapters/${chapter.previous}`}
        disabled={!chapter.previous}
        startDecorator={<ArrowBack />}
        size="sm"
        sx={{ width: { xs: '100%', sm: 'auto' } }}
      >
        上一章
      </Button>
      <Dropdown>
        <MenuButton
          startDecorator={<MenuIcon />}
          size="sm"
          color="primary"
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          章节列表
        </MenuButton>
        <Menu>
          {bookChapters.map((ch) => (
            <MenuItem key={ch.id} component={Link} to={`/chapters/${ch.id}`}>
              {ch.name}
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>
      <Button
        component={Link}
        to={`/chapters/${chapter.next}`}
        disabled={!chapter.next}
        endDecorator={<ArrowForward />}
        size="sm"
        sx={{ width: { xs: '100%', sm: 'auto' } }}
      >
        下一章
      </Button>
    </ButtonGroup>
  )
}
