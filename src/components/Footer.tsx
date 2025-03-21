import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import Box from '@mui/joy/Box'
import Divider from '@mui/joy/Divider'
import IconButton from '@mui/joy/IconButton'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import ListSubheader from '@mui/joy/ListSubheader'
import Sheet from '@mui/joy/Sheet'

export default function Footer() {
  return (
    <Sheet
      variant="solid"
      color="neutral"
      invertedColors
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          p: 2,
          minWidth: 'min-content',
        },
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'flex-start' },
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <IconButton variant="plain">
          <FacebookRoundedIcon />
        </IconButton>
        <IconButton variant="plain">
          <GitHubIcon />
        </IconButton>
        <Divider orientation="vertical" />
        <List
          size="sm"
          orientation="horizontal"
          wrap
          sx={{ flexGrow: 0, '--ListItem-radius': '8px' }}
        >
          <ListItem nested sx={{ width: { xs: '50%', md: 140 } }}>
            <ListSubheader sx={{ fontWeight: 'xl' }}>Sitemap</ListSubheader>
            <List>
              <ListItem>
                <ListItemButton>Services</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Blog</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>About</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          <ListItem nested sx={{ width: { xs: '50%', md: 180 } }}>
            <ListSubheader sx={{ fontWeight: 'xl' }}>Products</ListSubheader>
            <List>
              <ListItem>
                <ListItemButton>Joy UI</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>MUI Base</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Material UI</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Box>
    </Sheet>
  )
}
