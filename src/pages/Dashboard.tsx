import MainLayout from '../components/layouts/MainLayout'

export default function Dashboard() {
  return (
    <MainLayout title="管理中心">
      <div style={{ padding: 20 }}>
        <h1>欢迎来到管理中心</h1>
        <p>这里是管理中心的内容</p>
      </div>
    </MainLayout>
  )
}
