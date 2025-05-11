import { createTheme } from '@mui/material'
import { zhCN } from '@mui/x-data-grid/locales'

export const muiTheme = createTheme(
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
