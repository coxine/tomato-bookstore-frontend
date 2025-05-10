import { Tabs, TabList, Tab, tabClasses, TabPanel } from '@mui/joy'

import MainLayout from '../../components/layouts/MainLayout'

import AdsDataTable from './AdsDataTable'
import BooksDataTable from './BooksDataTable'
import CreateAdCard from './CreateAdCard'
import CreateBookCard from './CreateBookCard'
import OrdersDataTable from './OrdersDataTable'

export default function Dashboard() {
  return (
    <MainLayout title="管理中心">
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
            管理书籍
          </Tab>
          <Tab indicatorInset value={1}>
            创建书籍
          </Tab>
          <Tab indicatorInset value={2}>
            管理广告
          </Tab>
          <Tab indicatorInset value={3}>
            创建广告
          </Tab>
          <Tab indicatorInset value={4}>
            管理订单
          </Tab>
        </TabList>
        <TabPanel value={0}>
          <BooksDataTable />
        </TabPanel>
        <TabPanel value={1}>
          <CreateBookCard />
        </TabPanel>
        <TabPanel value={2}>
          <AdsDataTable />
        </TabPanel>
        <TabPanel value={3}>
          <CreateAdCard />
        </TabPanel>
        <TabPanel value={4}>
          <OrdersDataTable />
        </TabPanel>
      </Tabs>
    </MainLayout>
  )
}
