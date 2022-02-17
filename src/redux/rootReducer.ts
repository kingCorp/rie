import { connectRouter } from 'connected-react-router';

import { authReducer } from './reducers/authSlice';
import { loaderReducer } from './reducers/loaderSlice';
import { eventReducer } from './reducers/eventSlice';
import { BrowserHistory } from 'history';

export const createRootReducer = (history: BrowserHistory) => ({
  router: connectRouter(history),
  loader: loaderReducer,
  auth: authReducer,
  events: eventReducer,
});
