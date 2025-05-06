import { Avatar, Card, CardContent, Chip, Typography } from '@mui/joy'

import { Author } from '../../types/author'

interface AuthorCardProps {
  author: Author
  index: number
}

export default function AuthorCard({ author, index }: AuthorCardProps) {
  return (
    <Card
      key={index}
      variant="outlined"
      sx={{
        minWidth: { xs: 120, sm: 160 },
        textAlign: 'center',
      }}
    >
      <Avatar
        src={author.avatarURL}
        sx={{ width: 80, height: 80, mx: 'auto', mt: 2 }}
      />
      <CardContent>
        <Typography level="title-lg">{author.name}</Typography>
        <Typography
          color="primary"
          level="body-sm"
          sx={{
            overflow: 'auto',
          }}
        >
          {author.tags.map((tag, index) => (
            <Chip key={index} variant="soft" size="sm" color="primary">
              {tag}
            </Chip>
          ))}
        </Typography>
        <Typography level="body-sm" sx={{ mt: 1 }}>
          {author.description}
        </Typography>
      </CardContent>
    </Card>
  )
}
