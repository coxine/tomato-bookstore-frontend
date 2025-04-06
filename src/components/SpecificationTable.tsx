import { Table } from '@mui/joy'
import { useTheme } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import React from 'react'

import { Specification } from '../types/specification'

export default function SpecificationTable({
  specifications,
}: {
  specifications: Specification[]
}) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Table>
      <tbody>
        {isSmallScreen
          ? // 窄屏，每个规格单独一行
            specifications.map((spec) => (
              <tr key={spec.id}>
                <td style={{ fontWeight: 500, width: 120 }}>{spec.item}</td>
                <td>{spec.value}</td>
              </tr>
            ))
          : // 宽屏，两两分组显示
            specifications
              .reduce(
                (rows, spec, index) => {
                  if (index % 2 === 0) {
                    rows.push([spec])
                  } else {
                    rows[rows.length - 1].push(spec)
                  }
                  return rows
                },
                [] as Array<Array<(typeof specifications)[number]>>
              )
              .map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((spec) => (
                    <React.Fragment key={spec.id}>
                      <td style={{ fontWeight: 500, width: 120 }}>
                        {spec.item}
                      </td>
                      <td>{spec.value}</td>
                    </React.Fragment>
                  ))}
                  {row.length < 2 && (
                    <>
                      <td style={{ width: 120 }}></td>
                      <td></td>
                    </>
                  )}
                </tr>
              ))}
      </tbody>
    </Table>
  )
}
