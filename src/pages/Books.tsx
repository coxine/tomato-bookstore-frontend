import { Box, Typography } from '@mui/joy'

import Sidebar from '../components/Sidebar'



export default function Books() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Sidebar />
      <Box
        component="main"
        className="MainContent"
        sx={{
          pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1,
          overflow: 'auto',
        }}
      >
        <Box sx={{ flex: 1, width: '100%' }}>
          <Box
            sx={{
              position: 'sticky',
              top: { sm: -100, md: -110 },
              bgcolor: 'background.body',
              zIndex: 1,
            }}
          >
            <Box sx={{ px: { xs: 2, md: 6 } }}>
              <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                购买书籍
              </Typography>
            </Box>
            {/* 未来可利用 `Tabs` 增加不同分类的书籍选购 */}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
