import { Tabs, TabList, Tab, tabClasses, TabPanel } from '@mui/joy'

import MainLayout from '../../components/layouts/MainLayout'

import CreateBookCard from './CreateBookCard'

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
            创建商品
          </Tab>
        </TabList>
        <TabPanel value={0}>
          <CreateBookCard />
        </TabPanel>
      </Tabs>
    </MainLayout>
  )
}
