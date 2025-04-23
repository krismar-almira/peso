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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <AuthProvider>
        <Submain/>
      </AuthProvider>
    </SnackbarProvider>
  </StrictMode>,
)
