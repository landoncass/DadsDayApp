import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, ScrollRestoration } from 'react-router-dom'

import { App } from './App'
import './index.scss'
import 'mapbox-gl/dist/mapbox-gl.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>

        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
