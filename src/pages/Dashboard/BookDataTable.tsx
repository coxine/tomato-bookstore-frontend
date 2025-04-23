import { Delete, Edit, Launch } from '@mui/icons-material'
import { Box, IconButton, CssVarsProvider, Link } from '@mui/joy'
import type {} from '@mui/x-data-grid/themeAugmentation'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { zhCN } from '@mui/x-data-grid/locales'
import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { productGetAllSimpleInfo } from '../../api/products'
import Loading from '../../components/UI/Loading'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Book } from '../../types/book'

const columns: GridColDef<Book>[] = [
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
    valueFormatter: (params) => `¥${params || 0}`,
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

export default function BookDataTable() {
  const [bookList, setBookList] = useState<Book[]>()

  const fetchAllSimpleBook = () => {
    productGetAllSimpleInfo().then((res) => {
      if (res.data.code === '200') {
        setBookList(res.data.data)
      } else {
        showToast({
          title: '未知消息码',
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

  const MuiTheme = createTheme(
    {
      colorSchemes: {
        light: {
          palette: {
            DataGrid: {
              bg: '#f8fafc',
            },
          },
        },
        dark: {
          palette: {
            DataGrid: {
              bg: '#101417',
            },
          },
        },
      },
      components: {
        MuiDataGrid: {
          styleOverrides: {
            root: {
              border: 0,
              borderStyle: 'solid',
              borderRadius: 10,
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              padding: 10,
            },
          },
        },
      },
    },
    zhCN
  )

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        display: 'flex',
      }}
    >
      {!bookList ? (
        <Loading />
      ) : (
        <ThemeProvider theme={MuiTheme}>
          <DataGrid
            rows={bookList || []}
            getRowId={(row) => row.id}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 20, 100]}
            rowHeight={35}
            showToolbar
            sx={(theme) => ({
              color: theme.palette.text.primary,
            })}
          />
        </ThemeProvider>
      )}
    </Box>
  )
}
