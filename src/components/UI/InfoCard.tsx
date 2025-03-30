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
          <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            {actions}
          </CardActions>
        </CardOverflow>
      </Card>
    </Stack>
  )
}
