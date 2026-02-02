import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './pages/auth/authProvider'
import { router } from './router'
import RoleContext from './context/rolecontext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RoleContext.Provider value='member'>
        <RouterProvider router={router}/>
      </RoleContext.Provider>
    </AuthProvider>
  </StrictMode>,
)