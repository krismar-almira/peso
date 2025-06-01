import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { AuthProvider } from './context/authContext.jsx';
import Submain from './submain.jsx';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <Submain/>
      </AuthProvider>
      </LocalizationProvider>
     

    </SnackbarProvider>
  </StrictMode>,
)
