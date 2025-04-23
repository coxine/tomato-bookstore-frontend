import { Delete, Edit, Launch } from '@mui/icons-material'
import { Box, IconButton, CssVarsProvider, Link } from '@mui/joy'
import { GridColDef } from '@mui/x-data-grid'
import { Link as RouterLink } from 'react-router-dom'

import DataGridComponent from '../../components/UI/DataGridComponent'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Advertisement } from '../../types/advertisement'

// 示例数据
const mockAdsData: Advertisement[] = [
  {
    id: '1',
    title: 'JVM高效进阶，掌握Java核心之钥',
    content: '深入理解Java虚拟机：从字节码到内存管理，全面掌握JVM奥秘，助你攻克Java难关，打造更稳健程序',
    imgUrl: 'https://example.com/ad1.jpg',
    productId: '101'
  },
  {
    id: '2',
    title: '写出整洁代码，铸就开发者的极致修养',
    content: '以整洁优雅的代码，让开发者告别混乱与Bug，Robert Martin经典大著作，助你修炼编程内功！',
    imgUrl: 'https://example.com/ad2.jpg',
    productId: '202'
  }
]

const columns: GridColDef<Advertisement>[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'title',
    headerName: '广告标题',
    width: 250,
    editable: false,
    sortable: false,
    filterable: false,
  },
  {
    field: 'content',
    headerName: '广告内容',
    type: 'string',
    width: 400,
    editable: false,
    sortable: false,
    filterable: false,
  },
  {
    field: 'productId',
    headerName: '产品ID',
    width: 120,
    editable: false,
  },
  {
    field: 'actions',
    headerName: '操作',
    width: 160,
    sortable: false,
    filterable: false,
    renderCell: (row) => {
      return (
        <CssVarsProvider>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              width: '100%',
            }}
          >
            <Link component={RouterLink} to={`/books/${row.row.productId}`}>
              <IconButton variant="plain" color="neutral" size="sm">
                <Launch />
              </IconButton>
            </Link>
            <Link component={RouterLink} to={`/ads/edit/${row.row.id}`}>
              <IconButton variant="plain" color="primary" size="sm">
                <Edit />
              </IconButton>
            </Link>
            <IconButton
              variant="plain"
              color="danger"
              size="sm"
              onClick={() => {
                showToast({
                  title: '删除功能未实现',
                  message: '删除功能未实现',
                  severity: ToastSeverity.Warning,
                  duration: 3000,
                })
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        </CssVarsProvider>
      )
    },
  },
]

export default function AdsDataTable() {
  const isLoading = false

  return (
    <DataGridComponent rows={mockAdsData} columns={columns} loading={isLoading} />
  )
}