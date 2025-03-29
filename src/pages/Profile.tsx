import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Typography, Card, List, ListItem, Avatar } from "@mui/joy";

import Footer from "../components/Footer";
import Header from "../components/Header";


const profileData = {
  "username": "johndoe",
  "name": "John Doe",
  "avatar": "https://example.com/avatar.jpg",
  "telephone": "13812345678",
  "email": "john.doe@example.com",
  "location": "New York"
};

export default function Profile() {
  return (
    <Box>
      <Header />
      <Box
        display="flex"
        height="85vh"
        sx={(theme) => ({
          width: '100%',
          backgroundColor: 'rgba(250 250 250)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(5 5 5)',
          },
          pt: 10,
          pb: 2,
          px: 2,
          flexDirection: { xs: "column", md: "row" }
        })}
        gap={1}
      >
        {/* Sidebar */}
        <Card
          variant="soft"
          color="primary"
          sx={{
            width: { xs: "100%", md: 250 },
            p: 2
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Avatar size="lg" sx={{ mb: 2 }} variant="outlined" component="a" src={profileData.avatar} alt={profileData.username} />
            <Typography level="h3">{profileData.username}</Typography>
          </Box>
          <List>
            <ListItem>
              <AccountCircleIcon /> 基本资料
            </ListItem>
            <ListItem>
              <EditIcon /> 修改信息
            </ListItem>
          </List>
        </Card>

        <Card
          variant="soft"
          sx={{
            flex: 1,
            p: 3,
            ml: { xs: 0, md: 1 },
            width: { xs: "100%", md: "auto" },
            textAlign: "left"
          }}
        >
          <Typography level="title-lg" component="h2" mb={2}>个人资料</Typography>
          <List>
            <ListItem>
              <Typography level="body-lg" component="span" fontWeight="bold">姓名:</Typography>
              <Typography level="body-lg" component="span" ml={1}>{profileData.name}</Typography>
            </ListItem>
            <ListItem>
              <Typography level="body-lg" component="span" fontWeight="bold">电话:</Typography>
              <Typography level="body-lg" component="span" ml={1}>{profileData.telephone}</Typography>
            </ListItem>
            <ListItem>
              <Typography level="body-lg" component="span" fontWeight="bold">邮箱:</Typography>
              <Typography level="body-lg" component="span" ml={1}>{profileData.email}</Typography>
            </ListItem>
            <ListItem>
              <Typography level="body-lg" component="span" fontWeight="bold">位置:</Typography>
              <Typography level="body-lg" component="span" ml={1}>{profileData.location}</Typography>
            </ListItem>
          </List>
        </Card>
      </Box >
      <Footer />
    </Box >
  );
}