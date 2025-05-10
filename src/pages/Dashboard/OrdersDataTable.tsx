import { Visibility } from '@mui/icons-material'
import {
  Box,
  IconButton,
  CssVarsProvider,
  Modal,
  Typography,
  Sheet,
  Table,
  Chip,
  ThemeProvider,
} from '@mui/joy'
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material/'
import {
  GridColDef,
  GridFilterInputValueProps,
  GridFilterOperator,
} from '@mui/x-data-grid'
import { useEffect, useMemo, useState } from 'react'

import { orderGetAll } from '../../api/order'
import DataGridComponent from '../../components/UI/DataGridComponent'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { OrderDetail } from '../../types/order'
import {
  orderAddressFormatter,
  datetimeFormatter as timeFormatter,
  orderStatusFormatter,
  paymentMethodFormatter,
  priceFormatter,
} from '../../utils/formatter'

const OrderStatusInputValue = (props: GridFilterInputValueProps) => {
  const { item, applyValue, focusElementRef } = props

  const handleFilterChange = (event: SelectChangeEvent<unknown>) => {
    applyValue({ ...item, value: event.target.value as string })
  }

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <Select
        hiddenLabel
        value={item.value || ''}
        onChange={handleFilterChange}
        displayEmpty
        inputRef={focusElementRef}
      >
        <MenuItem value="">全部</MenuItem>
        <MenuItem value="SUCCESS">已支付</MenuItem>
        <MenuItem value="CANCELLED">已取消</MenuItem>
        <MenuItem value="PENDING">待支付</MenuItem>
      </Select>
    </FormControl>
  )
}

const orderStatusOperators: GridFilterOperator<OrderDetail, string>[] = [
  {
    label: '为',
    value: 'equals',
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) {
        return null
      }
      return (value) => value === filterItem.value
    },
    InputComponent: OrderStatusInputValue,
  },
]

const PaymentMethodInputValue = (props: GridFilterInputValueProps) => {
  const { item, applyValue, focusElementRef } = props

  const handleFilterChange = (event: SelectChangeEvent<unknown>) => {
    applyValue({ ...item, value: event.target.value as string })
  }

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <Select
        hiddenLabel
        value={item.value || ''}
        onChange={handleFilterChange}
        displayEmpty
        inputRef={focusElementRef}
        defaultValue=""
      >
        <MenuItem value="">全部</MenuItem>
        <MenuItem value="ALIPAY">支付宝</MenuItem>
      </Select>
    </FormControl>
  )
}

const paymentMethodOperators: GridFilterOperator<OrderDetail, string>[] = [
  {
    label: '为',
    value: 'equals',
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) {
        return null
      }
      return (value) => value === filterItem.value
    },
    InputComponent: PaymentMethodInputValue,
  },
]

const getColumns = (
  handleViewDetails: (order: OrderDetail) => void
): GridColDef<OrderDetail>[] => {
  return [
    { field: 'orderId', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: '收货人',
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: 'phone',
      headerName: '联系电话',
      width: 150,
      editable: false,
    },
    {
      field: 'address',
      headerName: '收货地址',
      width: 200,
      editable: false,
      valueFormatter: orderAddressFormatter,
    },
    {
      field: 'totalAmount',
      headerName: '总金额',
      type: 'number',
      width: 120,
      editable: false,
      valueFormatter: priceFormatter,
    },
    {
      field: 'paymentMethod',
      headerName: '支付方式',
      width: 120,
      editable: false,
      filterOperators: paymentMethodOperators,
      renderCell: (params) => {
        return (
          <ThemeProvider>
            <Chip color="primary" variant="soft">
              {paymentMethodFormatter(params.row.paymentMethod)}
            </Chip>
          </ThemeProvider>
        )
      },
    },
    {
      field: 'status',
      headerName: '订单状态',
      width: 120,
      editable: false,
      filterOperators: orderStatusOperators,
      renderCell: (params) => {
        return (
          <ThemeProvider>
            <Chip
              color={orderStatusFormatter(params.row.status).color}
              variant="soft"
            >
              {orderStatusFormatter(params.row.status).label}
            </Chip>
          </ThemeProvider>
        )
      },
    },
    {
      field: 'createTime',
      headerName: '创建时间',
      width: 200,
      editable: false,
      valueFormatter: timeFormatter,
    },
    {
      field: 'actions',
      headerName: '操作',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
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
              <IconButton
                variant="plain"
                color="primary"
                size="sm"
                onClick={() => handleViewDetails(params.row)}
              >
                <Visibility />
              </IconButton>
            </Box>
          </CssVarsProvider>
        )
      },
    },
  ]
}

export default function OrdersDataTable() {
  const [isLoading, setIsLoading] = useState(false)
  const [orderList, setOrderList] = useState<OrderDetail[]>()
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null)
  const [open, setOpen] = useState(false)

  const handleViewDetails = (order: OrderDetail) => {
    setSelectedOrder(order)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const columns = useMemo(() => getColumns(handleViewDetails), [])

  const fetchAllOrders = () => {
    orderGetAll().then((res) => {
      if (res.data.code === '200') {
        setOrderList(res.data.data.reverse())
      } else {
        showToast({
          title: '未知错误',
          message: '服务器出错！获取用户订单数据失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      fetchAllOrders()
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <>
      <DataGridComponent
        rows={orderList}
        columns={columns}
        loading={isLoading}
        getRowId={(row: OrderDetail) => {
          return row.orderId
        }}
      />

      {/* Order Details Modal */}
      <Modal
        aria-labelledby="order-details-modal"
        open={open}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: '80%',
            maxWidth: 800,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            maxHeight: '90vh',
            overflow: 'auto',
          }}
        >
          {selectedOrder && (
            <>
              <Typography level="h3" id="order-details-modal" mb={2}>
                订单详情 #{selectedOrder.orderId}
              </Typography>

              <Box mb={2}>
                <Typography level="h4" mb={1}>
                  订单信息
                </Typography>
                <Table>
                  <tbody>
                    <tr>
                      <td>收货人</td>
                      <td>{selectedOrder.name}</td>
                    </tr>
                    <tr>
                      <td>联系电话</td>
                      <td>{selectedOrder.phone}</td>
                    </tr>
                    <tr>
                      <td>收货地址</td>
                      <td>{selectedOrder.address}</td>
                    </tr>
                    <tr>
                      <td>支付方式</td>
                      <td>
                        {paymentMethodFormatter(selectedOrder.paymentMethod)}
                      </td>
                    </tr>
                    <tr>
                      <td>订单状态</td>
                      <td>
                        <Chip
                          color={
                            orderStatusFormatter(selectedOrder.status).color
                          }
                          variant="soft"
                        >
                          {orderStatusFormatter(selectedOrder.status).label}
                        </Chip>
                      </td>
                    </tr>
                    <tr>
                      <td>创建时间</td>
                      <td>{timeFormatter(selectedOrder.createTime)}</td>
                    </tr>
                    <tr>
                      <td>总金额</td>
                      <td>{priceFormatter(selectedOrder.totalAmount)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Box>

              <Typography level="h4">购买商品</Typography>
              <Table>
                <thead>
                  <tr>
                    <th style={{ width: 60 }}>封面</th>
                    <th>商品名称</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>小计</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.orderItems.map((item) => (
                    <tr key={item.productId}>
                      <td>
                        <img
                          src={item.cover}
                          alt={item.productTitle}
                          style={{ width: 50, height: 70, objectFit: 'cover' }}
                        />
                      </td>
                      <td>{item.productTitle}</td>
                      <td>{priceFormatter(item.price)}</td>
                      <td>{item.quantity}</td>
                      <td>{priceFormatter(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Sheet>
      </Modal>
    </>
  )
}
