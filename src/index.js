import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Kommunicate from './Pubic/Chatbot';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './Redux/store'
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <GoogleOAuthProvider clientId="827764849335-u758u0v853vi007gpsrib752jnbfqtao.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
    <Kommunicate />
  </React.StrictMode>
);
