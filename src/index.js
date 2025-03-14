import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './Redux/store'
import { Provider } from 'react-redux'
import Chatbot from './Pubic/Chatbot';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Chatbot/>
    <GoogleOAuthProvider clientId="827764849335-u758u0v853vi007gpsrib752jnbfqtao.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
