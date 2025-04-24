import { Grid } from '@mui/joy'
import { useEffect, useState } from 'react'

import { adGetAllInfo } from '../../api/ad'
import AdCard from '../../components/AdCard'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Advertisement } from '../../types/advertisement'

export default function BookCarousel() {
  const [adList, setAdList] = useState<Advertisement[]>()

  const fetchAllAd = () => {
    adGetAllInfo().then((res) => {
      if (res.data.code === '200') {
        setAdList(res.data.data)
      } else {
        showToast({
          title: '未知消息码',
          message: '服务器出错！获取广告数据失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }

  useEffect(() => {
    fetchAllAd()
  }, [])

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
      {adList &&
        adList.map((ad) => (
          <Grid
            xs={6}
            sm={2.7}
            key={ad.id}
            sx={{
              flex: { xs: '1 1 50%', sm: '0 0 auto' },
              minWidth: { xs: 'auto', sm: 200 },
            }}
          >
            <AdCard ad={ad} />
          </Grid>
        ))}
    </Grid>
  )
}
