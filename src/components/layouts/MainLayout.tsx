import { Box, Breadcrumbs, Typography } from '@mui/joy'
import * as React from 'react'
import { Link } from 'react-router-dom'

import Header from '../Header'

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
    <Box sx={{ minHeight: '100dvh' }}>
      <Header />
      <Box
        component="main"
        className="MainContent"
        sx={{
          pt: 'calc(var(--Header-height, 60px) + 20px)',
          pb: { xs: 2, sm: 2, md: 3 },
          px: { xs: 2, md: 4 },
          minHeight: 'calc(100dvh - var(--Header-height, 60px))',
        }}
      >
        <Box sx={{ flex: 1, width: '100%' }}>
          <Box
            sx={{
              top: { sm: -100, md: -110 },
              bgcolor: 'background.body',
              zIndex: 1,
            }}
          >
            <Box sx={{ px: { xs: 0, md: 6 } }}>
              <Breadcrumbs
                separator="›"
                aria-label="breadcrumbs"
                sx={{ px: 2 }}
              >
                <Link to="/">
                  <Typography level="body-md" color="primary">
                    首页
                  </Typography>
                </Link>
                {(breadcrumbsItems ?? []).map((item) => (
                  <Link key={`${item.label}-${item.link}`} to={item.link}>
                    <Typography level="body-md" color="primary">
                      {item.label}
                    </Typography>
                  </Link>
                ))}
                <Typography fontWeight="600">{title}</Typography>
              </Breadcrumbs>
              <Typography
                level="h2"
                component="h1"
                sx={{
                  pl: 2,
                  pb: 2,
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                }}
              >
                {title}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ px: 2 }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  )
}
