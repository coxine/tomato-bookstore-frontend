import { AspectRatio } from '@mui/joy'

export default function HomePageImage() {
  return (
    <AspectRatio
      ratio={600 / 520}
      variant="outlined"
      maxHeight={300}
      sx={(theme) => ({
        width: '100%',
        minWidth: 300,
        alignSelf: 'stretch',
        [theme.breakpoints.up(834)]: {
          alignSelf: 'initial',
          flexGrow: 1,
          '--AspectRatio-maxHeight': '520px',
          '--AspectRatio-minHeight': '400px',
        },
        borderRadius: 'sm',
        bgcolor: 'background.level2',
      })}
    >
      <img src="/home-book.png" alt="homebook" />
    </AspectRatio>
  )
}
