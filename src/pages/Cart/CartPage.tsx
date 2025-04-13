
import MainLayout from '../../components/layouts/MainLayout'
import Loading from '../../components/UI/Loading'


export default function CartPage() {


  return (
    <MainLayout
      breadcrumbsItems={[]}
      title="购物车"
    >
      <Loading />
    </MainLayout>
  )
}