import {
  Box,
  Card,
  CardActions,
  CardOverflow,
  Divider,
  Stack,
  Typography,
} from '@mui/joy'

export interface InfoCardProps {
  title: string
  description?: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export default function InfoCard({
  title,
  description,
  children,
  actions,
}: InfoCardProps) {
  return (
    <Stack
      spacing={4}
      sx={{
        display: 'flex',
        maxWidth: '800px',
        mx: 'auto',
        px: { xs: 2, md: 6 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Card>
        <Box>
          <Typography level="title-md" fontWeight="lg">
            {title}
          </Typography>
          <Typography level="body-sm">{description}</Typography>
        </Box>
        <Divider />
        {children}
        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <CardActions sx={{ alignSelf: { sm: 'flex-end' }, pt: 2 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              alignItems="center"
              width="100%"
              sx={{ display: 'flex' }}
            >
              {actions}
            </Stack>
          </CardActions>
        </CardOverflow>
      </Card>
    </Stack>
  )
}
