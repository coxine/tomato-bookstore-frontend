import { ChromeReaderMode, Edit } from '@mui/icons-material'
import { Box, Chip, IconButton, Table, Typography } from '@mui/joy'
import { Link } from 'react-router-dom'

import { Chapter } from '../../types/chapter'
import { chapterStatusFormatter } from '../../utils/formatter'

const bookChapters: Chapter[] = [ // TODO 获取章节列表
  {
    id: 1001,
    name: '第1章',
    state: 'FREE',
    productId: 15,
  },
  {
    id: 1002,
    name: '第2章',
    state: 'CHARGED',
    productId: 15,
  },
  {
    id: 1003,
    name: '第3章',
    state: 'LOCKED',
    productId: 15,
  },
]

export default function ChapterTable() {
  const isAdmin = sessionStorage.getItem('role') === 'ADMIN'
  return (
    <Box className="chapter-table" sx={{ px: { xs: 2, sm: 5, md: 10 } }}>
      <Typography level="h4" sx={{ pb: 1 }}>
        章节列表
      </Typography>
      <Table className="table">
        <thead>
          <tr>
            <th>章节编号</th>
            <th>章节名称</th>
            <th>章节状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {bookChapters.map((chapter, index) => (
            <tr key={chapter.id}>
              <td>{index + 1}</td>
              <td>{chapter.name}</td>
              <td>
                <Chip color={chapterStatusFormatter(chapter.state).color}>
                  {chapterStatusFormatter(chapter.state).label}
                </Chip>
              </td>
              <td>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {chapter.state === 'FREE' ? (
                    <IconButton
                      color="success"
                      variant="soft"
                      size="sm"
                      component={Link}
                      to={`/chapters/${chapter.id}`}
                    >
                      <ChromeReaderMode />
                    </IconButton>
                  ) : (
                    <IconButton
                      color="danger"
                      variant="soft"
                      size="sm"
                      disabled
                    >
                      <ChromeReaderMode />
                    </IconButton>
                  )}
                  {isAdmin && (
                    <IconButton
                      color="primary"
                      variant="soft"
                      size="sm"
                      component={Link}
                      to={`/chapters/edit/${chapter.id}`}
                    >
                      <Edit />
                    </IconButton>
                  )}
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  )
}
