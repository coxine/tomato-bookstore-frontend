import { Box, Card, CardContent, Typography } from '@mui/joy'

import { Advertisement } from '../types/advertisement'

interface AdCardProps {
  ad: Advertisement
}

export default function AdCard({ ad }: AdCardProps) {
  return (
    <Card
      key={ad.id}
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: { xs: 1, sm: 1.5, md: 2 },
        width: '100%',
        height: '100%',
        gap: { xs: 1, sm: 1.5, md: 2 },
        overflow: 'hidden',
      }}
    >
      {/* 左侧文字内容 */}
      <CardContent
        sx={{
          flex: 1,
          pl: { xs: 6, md: 6 },
          pr: { xs: 0, sm: 2 },
        }}
      >
        <Typography
          level="h2"
          component="h3"
          sx={{
            mb: 1,
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
          }}
        >
          {ad.title}
        </Typography>

        {ad.content && (
          <Typography
            level="body-lg"
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {ad.content}
          </Typography>
        )}
      </CardContent>

      {/* 右侧图片 */}
      {ad.imgUrl && (
        <Box
          component="img"
          src={ad.imgUrl}
          alt={ad.title}
          sx={{
            height: '100%',
            width: { xs: 'auto', sm: 'auto' },
            maxWidth: { xs: '50%', sm: '40%', md: 'none' },
            objectFit: 'contain',
            borderRadius: 'md',
            flexShrink: 0,
            pr: { xs: 6, md: 8 },
          }}
        />
      )}
    </Card>
  )
}
