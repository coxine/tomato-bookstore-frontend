import { FilterAlt, Recommend, RecommendOutlined } from '@mui/icons-material'
import {
  Box,
  Grid,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  IconButton,
  Button,
} from '@mui/joy'
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
import { Tag } from '../../types/tag'

export default function Books() {
  const [bookList, setBookList] = useState<Book[]>()
  const [adList, setAdList] = useState<Advertisement[]>()
  const numberOfAdsDisplayed = 2 // 随机生成广告数
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null)
  const [showRecommendations, setShowRecommendations] = useState<boolean>(true)
  const tags: Tag[] = [
    {
      id: 2,
      name: '悬疑',
    },
    {
      id: 3,
      name: '治愈',
    },
  ] // TODO fetch from server

  // Load recommendation preference from localStorage
  useEffect(() => {
    const storedPreference = localStorage.getItem('showRecommendations')
    if (storedPreference !== null) {
      setShowRecommendations(storedPreference === 'true')
    }
  }, [])

  // Toggle recommendations and save to localStorage
  const toggleRecommendations = () => {
    const newValue = !showRecommendations
    setShowRecommendations(newValue)
    localStorage.setItem('showRecommendations', newValue.toString())
  }

  // Handle tag selection
  const handleTagSelect = (tag: Tag | null) => {
    setSelectedTag(tag)
    console.log('Selected tag:', selectedTag ? selectedTag.name : 'All books')
    // TODO update `bookList` based on selected tag
  }

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
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              px: { xs: 2, md: 6 },
              mb: 2,
              gap: 1,
            }}
          >
            <Dropdown>
              <IconButton component={MenuButton} variant="soft" color="primary">
                <FilterAlt />
              </IconButton>
              <Menu>
                <MenuItem onClick={() => handleTagSelect(null)}>
                  所有书籍
                </MenuItem>
                {tags.map((tag) => (
                  <MenuItem key={tag.id} onClick={() => handleTagSelect(tag)}>
                    {tag.name}
                  </MenuItem>
                ))}
              </Menu>
            </Dropdown>
            <Button
              variant="soft"
              color={showRecommendations ? 'neutral' : 'success'}
              onClick={toggleRecommendations}
              startDecorator={
                showRecommendations ? <Recommend /> : <RecommendOutlined />
              }
            >
              {showRecommendations ? '隐藏推荐' : '显示推荐'}
            </Button>
          </Box>
          <Grid
            container
            spacing={2}
            sx={{
              px: { xs: 2, md: 6 },
              mt: 2,
            }}
          >
            {showRecommendations &&
              getRandomAds(numberOfAdsDisplayed).map((ad) => (
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
        </>
      )}
    </MainLayout>
  )
}
