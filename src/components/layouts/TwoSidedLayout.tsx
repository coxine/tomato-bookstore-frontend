import Box from '@mui/joy/Box'
import { typographyClasses } from '@mui/joy/Typography'
import * as React from 'react'

import BasicContainer from './BasicContainer'

export default function TwoSidedLayout({
  leftChildren,
  rightChildren,
}: React.PropsWithChildren<{
  leftChildren: React.ReactNode
  rightChildren: React.ReactNode
}>) {
  return (
    <BasicContainer>
      <Box
        sx={(theme) => ({
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'center',
          width: '100%', // 在垂直排列时占满宽度
          [theme.breakpoints.up(834)]: {
            alignItems: 'flex-start',
            textAlign: 'initial',
            flexBasis: '50%', // 固定宽度为父容器的一半
          },
          [`& .${typographyClasses.root}`]: {
            textWrap: 'balance',
          },
        })}
      >
        {leftChildren}
      </Box>
      <Box
        sx={(theme) => ({
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          width: '100%',
          [theme.breakpoints.up(834)]: {
            alignItems: 'flex-start',
            textAlign: 'initial',
            flexBasis: '50%', // 固定宽度为父容器的一半
          },
        })}
      >
        {rightChildren}
      </Box>
    </BasicContainer>
  )
}
