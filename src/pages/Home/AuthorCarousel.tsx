import { Box } from '@mui/joy'

import { Author } from '../../types/author'

import AuthorCard from './AuthorCard'

const authorList: Author[] = [
  {
    name: '刘钦老师',
    tags: ['传奇大师', '传奇大师'],
    description: '代表作《软件开发的技术基础》',
    avatarURL: 'https://example.com/avatar1.jpg',
  },
]

export default function AuthorCarousel() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateRows: 'repeat(2, auto)',
        gap: 2,
        p: 3,
        overflowX: 'auto',
      }}
    >
      {authorList.map((author, index) => (
        <AuthorCard author={author} index={index} />
      ))}
    </Box>
  )
}
