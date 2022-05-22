import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from './redux/store';
import AppRoutes from './routes';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <AppRoutes />
    </Provider>
  );
}

export default App;
