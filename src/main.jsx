import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {GoogleClientId} from './Constants/API'
import { Provider } from 'react-redux'
import { store } from './Redux/Store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>  
    <GoogleOAuthProvider clientId={GoogleClientId}>
      <App/>
    </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
)
