import { Delete, Edit, Launch } from '@mui/icons-material'
import { Box, IconButton, CssVarsProvider, Link, Chip } from '@mui/joy'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { productGetAllSimpleInfo } from '../../api/products'
import DataGridComponent from '../../components/UI/DataGridComponent'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Book } from '../../types/book'
import { Tag } from '../../types/tag'
import { priceFormatter } from '../../utils/formatter'
import DeleteBookDialog from '../Books/DeleteBookDialog'

const getColumns = (
  handleDeleteConfirmation: (id: number) => void
): GridColDef<Book>[] => {
  return [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: '书名',
      width: 200,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: 'price',
      headerName: '价格',
      type: 'number',
      width: 110,
      editable: false,
      valueFormatter: priceFormatter,
    },
    {
      field: 'rate',
      headerName: '评分',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'description',
      headerName: '描述',
      type: 'string',
      width: 400,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: 'tags',
      headerName: '标签',
      type: 'string',
      width: 200,
      editable: false,
      sortable: false,
      filterable: false,
      valueFormatter: (params) => {
        const tags: Tag[] = params || []
        return tags.map((tag) => tag.name).join(' ')
      },
      renderCell: (row) => {
        return (
          <CssVarsProvider>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                flexWrap: 'wrap',
                gap: 0.5,
              }}
            >
              {(row.value || []).map((tag: Tag) => (
                <Chip key={tag.id} variant="soft" color="primary" size="md">
                  {tag.name}
                </Chip>
              ))}
            </Box>
          </CssVarsProvider>
        )
      },
    },
    {
      field: 'actions',
      headerName: '操作',
      width: 160,
      sortable: false,
      filterable: false,
      disableExport: true,
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
              <Link component={RouterLink} to={`/books/${row.id}`}>
                <IconButton variant="plain" color="neutral" size="sm">
                  <Launch />
                </IconButton>
              </Link>
              <Link component={RouterLink} to={`/books/edit/${row.id}`}>
                <IconButton variant="plain" color="primary" size="sm">
                  <Edit />
                </IconButton>
              </Link>
              <IconButton
                variant="plain"
                color="danger"
                size="sm"
                onClick={() => {
                  handleDeleteConfirmation(parseInt(row.id.toString()))
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
}

export default function BooksDataTable() {
  const [bookList, setBookList] = useState<Book[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [productId, setProductId] = useState<number>()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDeleteConfirmation = (id: number) => {
    setProductId(id)
    setShowDeleteDialog(true)
  }

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false)
  }

  const columns = useMemo(() => getColumns(handleDeleteConfirmation), [])

  const fetchAllSimpleBook = () => {
    productGetAllSimpleInfo().then((res) => {
      setIsLoading(false)
      if (res.data.code === '200') {
        setBookList(res.data.data)
      } else {
        showToast({
          title: '未知错误',
          message: '服务器出错！获取商品数据失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }

  useEffect(() => {
    fetchAllSimpleBook()
  }, [])
  return (
    <>
      <DataGridComponent
        rows={bookList}
        columns={columns}
        loading={isLoading}
        slotProps={{
          toolbar: {
            csvOptions: {
              fileName: `西红柿读书商城书籍报表_${new Date().toLocaleString()}`,
            },
          },
        }}
      />
      {showDeleteDialog && productId && (
        <DeleteBookDialog
          productId={productId}
          onClose={handleCloseDeleteDialog}
          afterDelete={fetchAllSimpleBook}
        />
      )}
    </>
  )
}
