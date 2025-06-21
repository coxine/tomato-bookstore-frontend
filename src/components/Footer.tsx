import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Sheet,
  Typography,
} from '@mui/joy'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <Sheet
      variant="soft"
      color="primary"
      invertedColors
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        p: 2,
        minWidth: 'min-content',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          width: '100%',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography textAlign={'left'}>
            一屏纳尽千秋卷，
            <br />
            指畔星河万古流。
            <br />
            Made with ❤️ by 软件攻嗔小队
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <List
            size="sm"
            orientation="horizontal"
            wrap
            sx={{
              flexGrow: 0,
              '--ListItem-radius': '8px',
              display: 'flex',
            }}
          >
            <ListItem nested sx={{ width: { xs: '50%', md: 140 } }}>
              <ListSubheader sx={{ fontWeight: 'xl' }}>欢迎加入</ListSubheader>
              <List>
                <ListItem component={Link} to="https://software.nju.edu.cn/">
                  <ListItemButton>南京大学软件学院</ListItemButton>
                </ListItem>
                <ListItem
                  component={Link}
                  to="https://p.seec.seecoder.cn/portal"
                >
                  <ListItemButton>SEECoder</ListItemButton>
                </ListItem>
              </List>
            </ListItem>
            <ListItem nested sx={{ width: { xs: '50%', md: 180 } }}>
              <ListSubheader sx={{ fontWeight: 'xl' }}>友情链接</ListSubheader>
              <List>
                <ListItem component={Link} to="https://www.jjwxc.net/">
                  <ListItemButton>晋江文学城</ListItemButton>
                </ListItem>
                <ListItem component={Link} to="https://www.qimao.com/">
                  <ListItemButton>七猫免费小说</ListItemButton>
                </ListItem>
              </List>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Sheet>
  )
}
