import { useParams } from 'react-router-dom'

import MainLayout from '../../components/layouts/MainLayout'
import { Book } from '../../types/book'
import { Stockpile } from '../../types/stockpile'

import EditBookCard from './EditBookCard'
import EditStockpileCard from './EditStockpileCard'

export default function BookEdit() {
  const { id } = useParams()
  const initialStockpile: Stockpile = {
    id: '1001',
    amount: 85,
    frozen: 15,
    productId: '101',
  }

  const initialBookData: Book = {
    id: '101',
    title: '深入理解Java虚拟机',
    price: 99.5,
    rate: 9.5,
    description: 'Java开发者必读经典，全面讲解JVM工作原理',
    cover: 'https://example.com/covers/jvm.jpg',
    detail:
      '本书详细讲解了Java虚拟机的体系结构、内存管理、字节码执行等核心内容',
    specifications: [
      {
        id: '1001',
        item: '作者',
        value: '周志明',
        productId: '101',
      },
      {
        id: '1002',
        item: '副标题',
        value: 'JVM高级特性与最佳实践',
        productId: '101',
      },
      {
        id: '1003',
        item: 'ISBN',
        value: '9787111421900',
        productId: '101',
      },
      {
        id: '1004',
        item: '装帧',
        value: '平装',
        productId: '101',
      },
      {
        id: '1005',
        item: '页数',
        value: '540',
        productId: '101',
      },
      {
        id: '1006',
        item: '出版社',
        value: '机械工业出版社',
        productId: '101',
      },
      {
        id: '1007',
        item: '出版日期',
        value: '2013-09-01',
        productId: '101',
      },
    ],
  }
  return (
    <MainLayout
      title="编辑书籍"
      breadcrumbsItems={[
        { label: '购买书籍', link: '/books' },
        { label: '书籍详情', link: `/books/${id}` },
      ]}
    >
      <EditBookCard initialBookData={initialBookData} />
      <EditStockpileCard initialStockpile={initialStockpile} />
    </MainLayout>
  )
}
