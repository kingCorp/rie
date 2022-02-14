import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import { createRootReducer } from './rootReducer';

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: createRootReducer(history),
  middleware: [routerMiddleware(history)],
  devTools: process.env.NODE_ENV === 'production' ? false : true,
});
