import { Tabs, TabList, Tab, tabClasses, TabPanel } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'

import { userGetInfo } from '../api/user'
import MainLayout from '../components/layouts/MainLayout'
import Loading from '../components/UI/Loading'
import { showToast, ToastSeverity } from '../components/UI/ToastMessageUtils'
import type { Profile } from '../types/profile'

import EditProfileCard from './Profile/EditProfileCard'
import ProfileCard from './Profile/ProfileCard'

export default function Profile() {
  const username = sessionStorage.getItem('username')
  const [profileData, setProfileData] = useState<Profile>()
  const fetchUser = useCallback(async () => {
    if (username != null) {
      userGetInfo(username).then((res) => {
        if (res.data.code === '200') {
          setProfileData(res.data.data)
        } else {
          showToast({
            title: '未知消息码',
            message: '服务器出错，获取用户数据失败，请重新登录尝试!',
            severity: ToastSeverity.Warning,
            duration: 3000,
          })
        }
      })
    } else {
      showToast({
        title: '未登录',
        message: '请重新登录尝试!',
        severity: ToastSeverity.Warning,
        duration: 3000,
      })
    }
  }, [username])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <MainLayout title="个人中心">
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
            个人资料
          </Tab>
          <Tab indicatorInset value={1}>
            编辑信息
          </Tab>
        </TabList>
        <TabPanel value={0}>
          {profileData === undefined ? (
            <Loading />
          ) : (
            <ProfileCard profile={profileData} />
          )}
        </TabPanel>
        <TabPanel value={1}>
          {profileData === undefined ? (
            <Loading />
          ) : (
            <EditProfileCard profile={profileData} infoChange={fetchUser} />
          )}
        </TabPanel>
      </Tabs>
    </MainLayout>
  )
}
