import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='873744942590-1pmttm90g91l7v65g5illcthig1jpcem.apps.googleusercontent.com'>
      <App/>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
