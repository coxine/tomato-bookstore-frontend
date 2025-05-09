import { ChromeReaderMode, Edit } from '@mui/icons-material'
import { Box, Chip, IconButton, Table, Typography } from '@mui/joy'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { chapterGetAll } from '../../api/chapter'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Chapter } from '../../types/chapter'
import { chapterStatusFormatter } from '../../utils/formatter'

export default function ChapterTable() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const productIdNum = parseInt(productId || '0')
  const [bookChapters, setBookChapters] = useState<Chapter[]>()
  const isAdmin = sessionStorage.getItem('role') === 'ADMIN'

  useEffect(() => {
    if (!productIdNum) {
      showToast({
        title: '错误',
        message: '书籍ID不存在',
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      navigate('/books')
      return
    }

    chapterGetAll(productIdNum).then((res) => {
      if (res.data.code === '200') {
        setBookChapters(res.data.data)
      } else {
        showToast({
          title: '未知错误',
          message: '服务器出错！获取章节失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }, [navigate, productIdNum])

  return (
    <Box className="chapter-table" sx={{ px: { xs: 2, sm: 5, md: 10 } }}>
      <Typography level="h4" sx={{ pb: 1 }}>
        章节列表
      </Typography>
      {!bookChapters ? (
        '章节加载中'
      ) : (
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
                  <Chip color={chapterStatusFormatter(chapter.status).color}>
                    {chapterStatusFormatter(chapter.status).label}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {chapter.status === 'FREE' ? (
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
      )}
    </Box>
  )
}
