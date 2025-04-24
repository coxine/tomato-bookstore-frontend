import { Delete, Edit, Launch } from '@mui/icons-material'
import { Box, IconButton, CssVarsProvider, Link } from '@mui/joy'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { adGetAllInfo } from '../../api/ad'
import DataGridComponent from '../../components/UI/DataGridComponent'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Advertisement } from '../../types/advertisement'

import DeleteAdDialog from './DeleteAdDiaglog'

const getColumns = (
  setAdId: (id: string) => void,
  handleDeleteConfirmation: () => void
): GridColDef<Advertisement>[] => {
  return [
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
                  setAdId(row.id.toString())
                  handleDeleteConfirmation()
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

export default function AdsDataTable() {
  const [adList, setAdList] = useState<Advertisement[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [adId, setAdId] = useState<string>('')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDeleteConfirmation = () => {
    setShowDeleteDialog(true)
  }

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false)
  }

  const columns = useMemo(
    () => getColumns(setAdId, handleDeleteConfirmation),
    []
  )

  const fetchAllSimpleBook = () => {
    adGetAllInfo().then((res) => {
      setIsLoading(false)
      if (res.data.code === '200') {
        setAdList(res.data.data)
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

  return (
    <>
      <DataGridComponent rows={adList} columns={columns} loading={isLoading} />
      {showDeleteDialog && adId && (
        <DeleteAdDialog
          adId={adId}
          onClose={handleCloseDeleteDialog}
          afterDelete={fetchAllSimpleBook}
        />
      )}
    </>
  )
}
