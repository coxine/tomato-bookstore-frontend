import Container from '@mui/joy/Container'
import * as React from 'react'

export default function BasicContainer({
  children,
  reversed,
}: React.PropsWithChildren<{
  reversed?: boolean
}>) {
  return (
    <Container
      sx={[
        (theme) => ({
          position: 'relative',
          minHeight: '100%',
          display: 'flex',
          alignItems: 'center',
          py: 10,
          gap: 4,
          [theme.breakpoints.up(834)]: {
            flexDirection: 'row',
            gap: 6,
          },
          [theme.breakpoints.up(1199)]: {
            gap: 12,
          },
        }),
        reversed
          ? { flexDirection: 'column-reverse' }
          : { flexDirection: 'column' },
      ]}
    >
      {children}
    </Container>
  )
}
