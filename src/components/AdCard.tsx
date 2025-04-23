import { Box, Card, CardContent, Typography } from '@mui/joy'

import { Advertisement } from '../types/advertisement'

interface AdCardProps {
  ad: Advertisement
}

export default function AdCard({ ad }: AdCardProps) {
  console.log('AdCard', ad)
  return (
    <Card
      key={ad.id}
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 1,
        width: '100%',
        height: '100%',
      }}
    >
      {ad.imgUrl && (
        <Box
          component="img"
          src={ad.imgUrl}
          alt={ad.title}
          sx={{
            width: 100,
            height: 140,
            objectFit: 'cover',
            borderRadius: '4px',
          }}
        />
      )}

      <CardContent sx={{ textAlign: 'center', width: '100%' }}>
        <Typography
          level="title-lg"
          sx={{
            mt: 1,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
          }}
        >
          {ad.title}
        </Typography>

        {ad.content && (
          <Typography
            level="body-sm"
            textColor="text.secondary"
            sx={{
              mt: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {ad.content}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
