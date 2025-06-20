import {
  AccountCircle,
  AdminPanelSettings,
  ShoppingCartRounded,
  Store,
} from '@mui/icons-material'
import * as React from 'react'

export interface NavigationItem {
  label: string
  path: string
  icon: React.ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
}

// 主要导航项
export const mainNavigationItems: NavigationItem[] = [
  { label: '购买书籍', path: '/books', icon: <Store /> },
  { label: '购物车', path: '/cart', icon: <ShoppingCartRounded /> },
]

// 用户相关导航项
export const userNavigationItems: NavigationItem[] = [
  { label: '个人中心', path: '/profile', icon: <AccountCircle /> },
  {
    label: '管理中心',
    path: '/dashboard',
    icon: <AdminPanelSettings />,
    requireAdmin: true,
  },
]

// 获取过滤后的导航项
export const getFilteredNavigationItems = () => {
  const isAdmin = sessionStorage.getItem('role') === 'ADMIN'

  return {
    main: mainNavigationItems,
    user: userNavigationItems.filter(
      (item) => !item.requireAdmin || (item.requireAdmin && isAdmin)
    ),
  }
}
