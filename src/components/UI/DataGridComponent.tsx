import { Box } from '@mui/joy'
import type {} from '@mui/x-data-grid/themeAugmentation'
import { createTheme, ThemeProvider } from '@mui/material/'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { zhCN } from '@mui/x-data-grid/locales'

import Loading from './Loading'

const MuiTheme = createTheme(
  {
    colorSchemes: {
      light: {
        palette: {
          DataGrid: {
            bg: '#f8fafc',
          },
        },
      },
      dark: {
        palette: {
          DataGrid: {
            bg: '#101417',
          },
        },
      },
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 0,
            borderStyle: 'solid',
            borderRadius: 10,
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            padding: 10,
          },
        },
      },
    },
  },
  zhCN
)

interface DataGridComponentProps<T extends object> {
  rows: T[] | undefined
  columns: GridColDef<T>[]
  pageSize?: number
  rowHeight?: number
  showToolbar?: boolean
  loading?: boolean
  getRowId?: (row: T) => string | number
}

export default function DataGridComponent<T extends object>({
  rows,
  columns,
  pageSize = 5,
  rowHeight = 35,
  showToolbar = true,
  loading = false,
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
        <ThemeProvider theme={MuiTheme}>
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
