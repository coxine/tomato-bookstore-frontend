import Box from '@mui/joy/Box'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import ListSubheader from '@mui/joy/ListSubheader'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import { Divider } from '@mui/material'

export default function Footer() {
  return (
    <Sheet
      variant="soft"
      color="neutral"
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
            这里可以放一些文字
            <br />
            但是没美化之前就很丑
          </Typography>
        </Box>
        <Divider orientation="vertical" />
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
              <ListSubheader sx={{ fontWeight: 'xl' }}>链接</ListSubheader>
              <List>
                <ListItem>
                  <ListItemButton>一些链接</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>一些链接</ListItemButton>
                </ListItem>
              </List>
            </ListItem>
            <ListItem nested sx={{ width: { xs: '50%', md: 180 } }}>
              <ListSubheader sx={{ fontWeight: 'xl' }}>链接</ListSubheader>
              <List>
                <ListItem>
                  <ListItemButton>一些链接</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>一些链接</ListItemButton>
                </ListItem>
              </List>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Sheet>
  )
}
