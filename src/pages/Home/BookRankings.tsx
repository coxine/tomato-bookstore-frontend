import BookCarousel from '../../components/BookCarousel'

export default function BookRankings() {
  return (
    <BookCarousel
      autoPlay
      interval={3000}
      showDots
      showArrows
      height="350px"
      minHeight="300px"
      gap={16}
      bookCount={12}
    />
  )
}
