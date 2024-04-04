import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-k7eu453201ptp0k4.us.auth0.com"
      clientId="4k6jPszthGusV3fd3cFwd7aML9g3h1cc"
      authorizationParams={{
        redirect_uri: window.location.origin.includes('aaron') ? 
          'https://aaron.greider.org/flow-app/dist/index.html' : window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
