import { Box, Breadcrumbs, Typography } from '@mui/joy'
import * as React from 'react'
import { Link } from 'react-router-dom'

import Sidebar from '../Sidebar'
import SidebarHeader from '../SidebarHeader'

type breadcrumbsItem = {
  label: string
  link: string
}

export default function MainLayout({
  title,
  breadcrumbsItems,
  children,
}: React.PropsWithChildren<{
  title: string
  breadcrumbsItems?: breadcrumbsItem[]
}>) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Sidebar />
      <SidebarHeader />
      <Box
        component="main"
        className="MainContent"
        sx={{
          pt: { xs: 'calc(20px + var(--Header-height))', md: 3 },
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
              <Breadcrumbs separator="›" aria-label="breadcrumbs">
                <Link to="/">
                  <Typography level="body-md" color="primary" fontWeight="600">
                    首页
                  </Typography>
                </Link>
                {(breadcrumbsItems ?? []).map((item) => (
                  <Link key={`${item.label}-${item.link}`} to={item.link}>
                    <Typography
                      level="body-md"
                      color="primary"
                      fontWeight="600"
                    >
                      {item.label}
                    </Typography>
                  </Link>
                ))}
                <Typography>{title}</Typography>
              </Breadcrumbs>
              <Typography level="h2" component="h1" sx={{ pl: 2 }}>
                {title}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ p: 2 }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  )
}
