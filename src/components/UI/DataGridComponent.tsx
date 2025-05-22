import { Box } from '@mui/joy'
import type { } from '@mui/x-data-grid/themeAugmentation'
import { ThemeProvider } from '@mui/material/'
import {
  DataGrid,
  GridColDef,
  GridSlotsComponentsProps,
} from '@mui/x-data-grid'

import { muiTheme } from '../../theme/muiTheme'

import Loading from './Loading'

interface DataGridComponentProps<T extends object> {
  rows: T[] | undefined
  columns: GridColDef<T>[]
  pageSize?: number
  rowHeight?: number
  showToolbar?: boolean
  loading?: boolean
  slotProps?: GridSlotsComponentsProps
  getRowId?: (row: T) => string | number
}

export default function DataGridComponent<T extends object>({
  rows,
  columns,
  pageSize = 10,
  rowHeight = 35,
  showToolbar = true,
  loading = false,
  slotProps = {},
  getRowId,
}: DataGridComponentProps<T>) {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        display: 'flex',
      }}
    >
      {loading || !rows ? (
        <Loading />
      ) : (
        <ThemeProvider theme={muiTheme}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: pageSize, page: 0 },
              },
            }}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 20, 100]}
            rowHeight={rowHeight}
            showToolbar={showToolbar}
            slotProps={slotProps}
            sx={(theme) => ({
              color: theme.palette.text.primary,
            })}
            getRowId={getRowId}
          />
        </ThemeProvider>
      )}
    </Box>
  )
}
