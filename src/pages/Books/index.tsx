import { Grid } from '@mui/joy'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { adGetAllInfo } from '../../api/ad'
import { productGetAllSimpleInfo } from '../../api/products'
import AdCard from '../../components/AdCard'
import Bookcard from '../../components/BookCard'
import MainLayout from '../../components/layouts/MainLayout'
import Loading from '../../components/UI/Loading'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Advertisement } from '../../types/advertisement'
import { Book } from '../../types/book'

export default function Books() {
  const [bookList, setBookList] = useState<Book[]>()
  const [adList, setAdList] = useState<Advertisement[]>()
  const numberOfAdsDisplayed = 2 // 随机生成广告数

  const fetchAllSimpleBook = () => {
    productGetAllSimpleInfo().then((res) => {
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

  const fetchAllAd = () => {
    adGetAllInfo().then((res) => {
      if (res.data.code === '200') {
        setAdList(res.data.data)
      } else {
        showToast({
          title: '未知错误',
          message: '服务器出错！获取广告数据失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }

  // Function to get random ads from adList
  const getRandomAds = (count: number) => {
    if (!adList) return []
    const shuffled = [...adList].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, Math.min(count, adList.length))
  }

  useEffect(() => {
    fetchAllSimpleBook()
    fetchAllAd()
  }, [])

  return (
    <MainLayout title="购买书籍">
      {!bookList || !adList ? (
        <Loading />
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            px: { xs: 2, md: 6 },
            mt: 2,
          }}
        >
          {getRandomAds(numberOfAdsDisplayed).map((ad) => (
            <Grid key={ad.id} xs={6} sm={4} md={2.4}>
              <Link to={`/books/${ad.productId}`}>
                <AdCard ad={ad} />
              </Link>
            </Grid>
          ))}
          {bookList.map((book) => (
            <Grid key={book.id} xs={6} sm={4} md={2.4}>
              <Link to={`/books/${book.id}`}>
                <Bookcard book={book} />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </MainLayout>
  )
}
