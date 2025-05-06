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
} from '@mui/joy'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useMemo, useState } from 'react'

import DataGridComponent from '../../components/UI/DataGridComponent'
import { OrderDetail } from '../../types/order'
import {
  orderAddressFormatter,
  datetimeFormatter as timeFormatter,
  orderStatusFormatter,
  paymentMethodFormatter,
  priceFormatter,
} from '../../utils/formatter'

const orderList: OrderDetail[] = [
  {
    orderId: 46,
    totalAmount: 330.1,
    paymentMethod: 'ALIPAY',
    status: 'CANCELLED',
    createTime: '2025-04-18T15:18:55.269+00:00',
    name: 'test',
    address: '123',
    phone: '18723414746',
    orderItems: [
      {
        productId: 30,
        productTitle: '锦瑟',
        quantity: 10,
        price: 33.01,
        cover:
          'https://tomato-nju.oss-cn-nanjing.aliyuncs.com/8b55c9d2-7479-4c41-9d9f-d8a024d90514.jpeg',
      },
    ],
  },
  {
    orderId: 47,
    totalAmount: 330.1,
    paymentMethod: 'ALIPAY',
    status: 'CANCELLED',
    createTime: '2025-04-18T15:18:57.428+00:00',
    name: 'test',
    address: '123',
    phone: '18723414746',
    orderItems: [
      {
        productId: 30,
        productTitle: '锦瑟',
        quantity: 10,
        price: 33.01,
        cover:
          'https://tomato-nju.oss-cn-nanjing.aliyuncs.com/8b55c9d2-7479-4c41-9d9f-d8a024d90514.jpeg',
      },
      {
        productId: 30,
        productTitle: '锦瑟',
        quantity: 10,
        price: 33.01,
        cover:
          'https://tomato-nju.oss-cn-nanjing.aliyuncs.com/8b55c9d2-7479-4c41-9d9f-d8a024d90514.jpeg',
      },
    ],
  },
  {
    orderId: 50,
    totalAmount: 298.5,
    paymentMethod: 'ALIPAY',
    status: 'SUCCESS',
    createTime: '2025-05-05T07:34:32.462+00:00',
    name: 'test',
    address: '123',
    phone: '18723414746',
    orderItems: [
      {
        productId: 15,
        productTitle: '深入理解Java虚拟机',
        quantity: 3,
        price: 99.5,
        cover:
          'https://tomato-nju.oss-cn-nanjing.aliyuncs.com/017ac261-c14b-4adf-994d-c583afee7048.png',
      },
    ],
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
      valueFormatter: paymentMethodFormatter,
    },
    {
      field: 'status',
      headerName: '订单状态',
      width: 120,
      editable: false,
      valueFormatter: (params) => {
        return orderStatusFormatter(params).label
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

  //TODO fetch
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
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
