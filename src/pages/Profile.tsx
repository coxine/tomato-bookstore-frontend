import { Box, Tabs, TabList, Tab, Typography, tabClasses, TabPanel } from '@mui/joy';

import Sidebar from '../components/Sidebar';
import type { Profile } from '../types/profile';

import EditProfileCard from './Profile/EditProfileCard';
import ProfileCard from './Profile/ProfileCard';

const profileData: Profile = {
  username: 'johndoe',
  name: 'John Doe',
  avatar: 'https://example.com/avatar.jpg',
  telephone: '13812345678',
  email: 'john.doe@example.com',
  location: 'New York'
};

export default function Profile() {
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
              zIndex: 9995,
            }}
          >
            <Box sx={{ px: { xs: 2, md: 6 } }}>
              <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                个人中心
              </Typography>
            </Box>
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
              <TabPanel value={0} ><ProfileCard profile={profileData} /></TabPanel>
              <TabPanel value={1} ><EditProfileCard profile={profileData} /></TabPanel>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

