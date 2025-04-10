import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { productGetInfo, productGetStockpile } from '../../api/products'
import MainLayout from '../../components/layouts/MainLayout'
import Loading from '../../components/UI/Loading'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Book } from '../../types/book'
import { Stockpile } from '../../types/stockpile'

import EditBookCard from './EditBookCard'
import EditStockpileCard from './EditStockpileCard'

export default function BookEdit() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const [initialBookData, setInitialBookData] = useState<Book>()
  const [initialStockpile, setInitialStockpile] = useState<Stockpile>()
  const fetchBookDetails = useCallback(async () => {
    if (!productId) {
      showToast({
        title: '意外错误',
        message: '不存在商品ID！',
        severity: ToastSeverity.Warning,
        duration: 3000,
      })
      navigate('/')
    } else {
      productGetInfo(productId).then((res) => {
        if (res.data.code === '200') {
          setInitialBookData(res.data.data)
        } else {
          showToast({
            title: '未知消息码',
            message: '服务器出错！获取商品数据失败，请刷新尝试！',
            severity: ToastSeverity.Warning,
            duration: 3000,
          })
        }
      })
      productGetStockpile(productId).then((res) => {
        if (res.data.code === '200') {
          setInitialStockpile(res.data.data)
        } else {
          showToast({
            title: '未知消息码',
            message: '服务器出错！获取商品库存失败，请刷新尝试！',
            severity: ToastSeverity.Warning,
            duration: 3000,
          })
        }
      })
    }
  }, [productId, navigate])

  useEffect(() => {
    fetchBookDetails()
  }, [fetchBookDetails])
  return (
    <MainLayout
      title="编辑书籍"
      breadcrumbsItems={[
        { label: '购买书籍', link: '/books' },
        { label: '书籍详情', link: `/books/${productId}` },
      ]}
    >
      {!productId || !initialBookData || !initialStockpile ? (
        <Loading />
      ) : (
        <>
          <EditBookCard
            productId={productId}
            initialBookData={initialBookData}
          />
          <EditStockpileCard
            productId={productId}
            initialStockpile={initialStockpile}
          />
        </>
      )}
    </MainLayout>
  )
}
