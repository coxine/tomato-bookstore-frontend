import type {} from '@mui/x-data-grid/themeAugmentation'
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { zhCN } from '@mui/x-data-grid/locales'
import { useEffect, useState } from 'react'

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
    <Box sx={{ height: '100%', width: '100%' }}>
      {!bookList ? (
        <Loading />
      ) : (
        <ThemeProvider theme={MuiTheme}>
          <DataGrid
            rows={bookList || []}
            getRowId={(row) => row.id}
            columns={columns}
            pageSizeOptions={[10, 20, 30]}
            rowHeight={35}
            checkboxSelection
            sx={(theme) => ({
              color: theme.palette.text.primary,
            })}
          />
        </ThemeProvider>
      )}
    </Box>
  )
}
