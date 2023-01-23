import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { App } from './App'
import './index.scss'

import { AllDaysOut } from './pages/AllDaysOut'
import { PersonalDayOut } from './pages/PersonalDayOut'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/alldaysout',
    element: <AllDaysOut />,
  },
  {
    path: '/yourdaysout',
    element: <PersonalDayOut />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
