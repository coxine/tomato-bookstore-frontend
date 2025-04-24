import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { productGetInfo, productGetStockpile } from '../../api/products'
import MainLayout from '../../components/layouts/MainLayout'
import Loading from '../../components/UI/Loading'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Book } from '../../types/book'
import { Stockpile } from '../../types/stockpile'

import BookInfo from './BookInfo'
import CartDialog from './CartDialog'
import DeleteBookDialog from './DeleteBookDialog'

export default function BookDetails() {
  const breadcrumbsItems = [{ label: '购买书籍', link: '/books' }]
  const { productId } = useParams()
  const navigate = useNavigate()
  const [bookDetails, setBookDetails] = useState<Book>()
  const [stockpile, setStockpile] = useState<Stockpile>()
  const [showCartDialog, setShowCartDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [cartMode, setCartMode] = useState<'add' | 'buy'>('add')

  const fecthStockpile = useCallback(() => {
    if (!productId) return
    productGetStockpile(productId).then((res) => {
      if (res.data.code === '200') {
        setStockpile(res.data.data)
      } else {
        showToast({
          title: '未知消息码',
          message: '服务器出错！获取商品库存失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }, [productId])

  const fetchBook = useCallback(() => {
    if (!productId) return
    productGetInfo(productId).then((res) => {
      if (res.data.code === '200') {
        setBookDetails(res.data.data)
      } else {
        showToast({
          title: '未知消息码',
          message: '服务器出错！获取商品数据失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }, [productId])

  const handleCart = (mode: 'add' | 'buy') => {
    if (!bookDetails || !productId) return
    setCartMode(mode)
    setShowCartDialog(true)
  }

  const handleCloseCartDialog = () => {
    setShowCartDialog(false)
  }

  const handleDeleteConfirmation = () => {
    if (!productId) return
    setShowDeleteDialog(true)
  }

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false)
  }

  useEffect(() => {
    if (!productId) {
      showToast({
        title: '意外错误',
        message: '不存在商品ID！',
        severity: ToastSeverity.Warning,
        duration: 3000,
      })
      navigate('/')
      return
    }
    fetchBook()
    fecthStockpile()
  }, [fecthStockpile, fetchBook, navigate, productId])

  return (
    <MainLayout title="书籍详情" breadcrumbsItems={breadcrumbsItems}>
      {!bookDetails || !productId ? (
        <Loading />
      ) : (
        <>
          {showCartDialog && bookDetails && (
            <CartDialog
              mode={cartMode}
              onClose={handleCloseCartDialog}
              bookDetails={bookDetails}
              stockpile={stockpile}
            />
          )}

          {showDeleteDialog && productId && (
            <DeleteBookDialog
              productId={productId}
              onClose={handleCloseDeleteDialog}
              afterDelete={() => {
                setTimeout(() => {
                  window.location.href = '/books'
                }, 500)
              }}
            />
          )}

          <BookInfo
            bookDetails={bookDetails}
            stockpile={stockpile}
            onCartAction={handleCart}
            onDeleteClick={handleDeleteConfirmation}
          />
        </>
      )}
    </MainLayout>
  )
}
