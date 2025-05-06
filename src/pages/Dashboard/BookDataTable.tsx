import { Delete, Edit, Launch } from '@mui/icons-material'
import { Box, IconButton, CssVarsProvider, Link } from '@mui/joy'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { productGetAllSimpleInfo } from '../../api/products'
import DataGridComponent from '../../components/UI/DataGridComponent'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Book } from '../../types/book'
import { priceFormatter } from '../../utils/formatter'
import DeleteBookDialog from '../Books/DeleteBookDialog'

const getColumns = (
  handleDeleteConfirmation: (id: string) => void
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
                  handleDeleteConfirmation(row.id.toString())
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

export default function BookDataTable() {
  const [bookList, setBookList] = useState<Book[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [productId, setProductId] = useState<string>('')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDeleteConfirmation = (id: string) => {
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
