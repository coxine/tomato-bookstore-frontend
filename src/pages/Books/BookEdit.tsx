import { Tabs, TabList, Tab, tabClasses, TabPanel } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { productGetInfo, productGetStockpile } from '../../api/products'
import MainLayout from '../../components/layouts/MainLayout'
import Loading from '../../components/UI/Loading'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Book } from '../../types/book'
import { Stockpile } from '../../types/stockpile'

import CreateChapterCard from './CreateChapterCard'
import EditBookCard from './EditBookCard'
import EditStockpileCard from './EditStockpileCard'

export default function BookEdit() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const productIdNum = parseInt(productId || '0')
  const [initialBookData, setInitialBookData] = useState<Book>()
  const [initialStockpile, setInitialStockpile] = useState<Stockpile>()

  const fetchBookDetails = useCallback(async () => {
    if (!productIdNum) {
      showToast({
        title: '意外错误',
        message: '不存在商品ID！',
        severity: ToastSeverity.Warning,
        duration: 3000,
      })
      navigate('/')
    } else {
      productGetInfo(productIdNum).then((res) => {
        if (res.data.code === '200') {
          setInitialBookData(res.data.data)
        } else {
          showToast({
            title: '未知错误',
            message: '服务器出错！获取商品数据失败，请刷新尝试！',
            severity: ToastSeverity.Warning,
            duration: 3000,
          })
        }
      })
      productGetStockpile(productIdNum).then((res) => {
        if (res.data.code === '200') {
          setInitialStockpile(res.data.data)
        } else {
          showToast({
            title: '未知错误',
            message: '服务器出错！获取商品库存失败，请刷新尝试！',
            severity: ToastSeverity.Warning,
            duration: 3000,
          })
        }
      })
    }
  }, [productIdNum, navigate])

  useEffect(() => {
    fetchBookDetails()
  }, [fetchBookDetails])

  return (
    <MainLayout
      title="编辑书籍"
      breadcrumbsItems={[
        { label: '购买书籍', link: '/books' },
        { label: '书籍详情', link: `/books/${productIdNum}` },
      ]}
    >
      {!productIdNum || !initialBookData || !initialStockpile ? (
        <Loading />
      ) : (
        <Tabs defaultValue={0} sx={{ bgcolor: 'transparent' }}>
          <TabList
            tabFlex={1}
            size="sm"
            sx={{
              pl: { xs: 0, md: 4 },
              justifyContent: 'left',
              [`&& .${tabClasses.root}`]: {
                fontWeight: '600',
                flex: 'initial',
                [`&.${tabClasses.selected}`]: {
                  bgcolor: 'transparent',
                  '&::after': {
                    height: '2px',
                    bgcolor: 'primary.500',
                  },
                },
              },
            }}
          >
            <Tab indicatorInset value={0}>
              编辑书籍
            </Tab>
            <Tab indicatorInset value={1}>
              编辑库存
            </Tab>
            <Tab indicatorInset value={2}>
              新增章节
            </Tab>
          </TabList>
          <TabPanel value={0}>
            <EditBookCard
              productId={productIdNum}
              initialBookData={initialBookData}
            />
          </TabPanel>
          <TabPanel value={1}>
            <EditStockpileCard
              productId={productIdNum}
              initialStockpile={initialStockpile}
            />
          </TabPanel>
          <TabPanel value={2}>
            <CreateChapterCard productId={Number(productId)} />
          </TabPanel>
        </Tabs>
      )}
    </MainLayout>
  )
}
