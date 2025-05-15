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
import RatingDialog from './RatingDialog'

export default function BookDetails() {
  const breadcrumbsItems = [{ label: '购买书籍', link: '/books' }]
  const { productId } = useParams()
  const productIdNum = parseInt(productId || '0')
  const navigate = useNavigate()
  const [bookDetails, setBookDetails] = useState<Book>()
  const [stockpile, setStockpile] = useState<Stockpile>()
  const [showCartDialog, setShowCartDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [cartMode, setCartMode] = useState<'add' | 'buy'>('add')
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const fecthStockpile = useCallback(() => {
    if (!productIdNum) return
    productGetStockpile(productIdNum).then((res) => {
      if (res.data.code === '200') {
        setStockpile(res.data.data)
      } else {
        showToast({
          title: '未知错误',
          message: '服务器出错！获取商品库存失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }, [productIdNum])

  const fetchBook = useCallback(() => {
    if (!productIdNum) return
    productGetInfo(productIdNum).then((res) => {
      if (res.data.code === '200') {
        setBookDetails(res.data.data)
      } else {
        showToast({
          title: '未知错误',
          message: '服务器出错！获取商品数据失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }, [productIdNum])

  const handleCart = (mode: 'add' | 'buy') => {
    if (!bookDetails || !productIdNum) return
    setCartMode(mode)
    setShowCartDialog(true)
  }

  const handleCloseCartDialog = () => {
    setShowCartDialog(false)
  }

  const handleDeleteConfirmation = () => {
    if (!productIdNum) return
    setShowDeleteDialog(true)
  }

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false)
  }

  const onRatingClick = () => {
    setShowRatingDialog(true)
  }

  const handleCloseRatingDialog = () => {
    setShowRatingDialog(false)
  }

  useEffect(() => {
    if (!productIdNum) {
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
  }, [fecthStockpile, fetchBook, navigate, productIdNum])

  const updateRate = (rate: number) => {
    if (!bookDetails) {
      showToast({
        title: '意外错误',
        message: '不存在商品信息，请刷新重试！',
        severity: ToastSeverity.Warning,
        duration: 3000,
      })
      return
    }
    setBookDetails({
      ...bookDetails,
      rate: rate,
    })
  }

  return (
    <MainLayout title="书籍详情" breadcrumbsItems={breadcrumbsItems}>
      {!bookDetails || !productIdNum ? (
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

          {showDeleteDialog && productIdNum && (
            <DeleteBookDialog
              productId={productIdNum}
              onClose={handleCloseDeleteDialog}
              afterDelete={() => {
                setTimeout(() => {
                  window.location.href = '/books'
                }, 500)
              }}
            />
          )}

          {showRatingDialog && (
            <RatingDialog
              productId={productIdNum}
              onChange={updateRate}
              onClose={handleCloseRatingDialog}
            />
          )}

          <BookInfo
            bookDetails={bookDetails}
            stockpile={stockpile}
            onCartAction={handleCart}
            onRatingClick={onRatingClick}
            onDeleteClick={handleDeleteConfirmation}
          />
        </>
      )}
    </MainLayout>
  )
}
