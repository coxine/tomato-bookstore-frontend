import { Grid } from '@mui/joy'
import { Link } from 'react-router-dom'

import BookCard from '../../components/BookCard'
import { Book } from '../../types/book'

export default function BookRankings() {
  const bookCount = 5
  console.log('bookCount', bookCount)
  const bookRankings: Book[] = [
    // TODO fetch with bookCount
    {
      id: 204,
      title: '放学等我',
      price: 33.0,
      rate: 9.0,
      description: '喻繁看班里那位新来的转班生非常不爽。对方朝他看了一眼。',
      cover:
        'https://tomato-nju.oss-cn-nanjing.aliyuncs.com/fc01905c-31fd-4453-8673-d309c0faf5a6.jpeg',
      detail:
        '喻繁看班里那位新来的转班生非常不爽。对方朝他看了一眼。\n\n喻繁：他在找我约架。\n\n第二眼。喻繁：他问我是不是怂了。\n\n第三眼。转班生依旧顶着那张面无表情的冰山脸，递给他一封信：“喻同学。”\n\n喻繁心想学霸就是臭讲究，打架还递挑战信，抡起衣袖站起身。“请你收下我的情书。”喻同学敦地一下坐回去了。\n\n——陈景深（攻）x喻繁（受）日常，慢热',
      specifications: [
        {
          id: 47,
          item: '作者',
          value: '酱子贝',
          productId: 204,
        },
      ],
      tags: [
        {
          id: 9,
          name: '纯爱',
        },
        {
          id: 10,
          name: '校园',
        },
      ],
    },
    {
      id: 15,
      title: '深入理解Java虚拟机',
      price: 99.5,
      rate: 7.43333,
      description: 'Java开发者必读经典，全面讲解JVM工作原理',
      cover:
        'https://tomato-nju.oss-cn-nanjing.aliyuncs.com/017ac261-c14b-4adf-994d-c583afee7048.png',
      detail:
        '本书详细讲解了Java虚拟机的体系结构、内存管理、字节码执行等核心内容',
      specifications: [
        {
          id: 1,
          item: '副标题',
          value: 'JVM高级特性与最佳实践',
          productId: 15,
        },
        {
          id: 2,
          item: '出版日期',
          value: '2013-09-01',
          productId: 15,
        },
        {
          id: 3,
          item: '作者',
          value: '周志明',
          productId: 15,
        },
        {
          id: 4,
          item: 'ISBN',
          value: '9787111421900',
          productId: 15,
        },
        {
          id: 5,
          item: '页数',
          value: '540',
          productId: 15,
        },
        {
          id: 7,
          item: '出版社',
          value: '机械工业出版社',
          productId: 15,
        },
      ],
      tags: [
        {
          id: 9,
          name: '纯爱',
        },
        {
          id: 10,
          name: '校园',
        },
      ],
    },
  ]

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: 'flex',
        flexWrap: { xs: 'wrap', sm: 'nowrap' }, // Allow wrapping in xs mode
        flexDirection: { xs: 'row', sm: 'row' },
        overflowX: { xs: 'initial', sm: 'auto' },
        overflowY: { xs: 'auto', sm: 'initial' },
        p: 1,
      }}
    >
      {bookRankings &&
        bookRankings.map((book) => (
          <Grid
            to={`/books/${book.id}`}
            xs={6}
            sm={2.7}
            key={book.id}
            sx={{
              flex: { xs: '1 1 50%', sm: '0 0 auto' },
              minWidth: { xs: 'auto', sm: 200 },
            }}
            component={Link}
          >
            <BookCard book={book} />
          </Grid>
        ))}
    </Grid>
  )
}
