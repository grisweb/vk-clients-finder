import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import '@vkontakte/vkui/dist/vkui.css';

import 'assets/styles/index.scss';

import { store } from './app/store';
import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
