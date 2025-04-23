import { Grid } from '@mui/joy'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
  const numberOfAdsDisplayed = 2
  const adList: Advertisement[] = [
    {
      id: '1',
      title: 'JVM高效进阶，掌握Java核心之钥',
      content:
        '深入理解Java虚拟机：从字节码到内存管理，全面掌握JVM奥秘，助你攻克Java难关，打造更稳健程序',
      imgUrl: 'https://bed.cos.tg/file/1745411308246_夏夜的静谧学者.png',
      productId: '101',
    },
    {
      id: '2',
      title: '写出整洁代码，铸就开发者的极致修养',
      content:
        '以整洁优雅的代码，让开发者告别混乱与Bug，Robert Martin经典大著作，助你修炼编程内功！',
      imgUrl: 'https://bed.cos.tg/file/1745411308246_夏夜的静谧学者.png',
      productId: '202',
    },
  ]

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

  // Function to get random ads from adList
  const getRandomAds = (count: number) => {
    const shuffled = [...adList].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, Math.min(count, adList.length))
  }

  useEffect(() => {
    fetchAllSimpleBook()
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
