import { connectRouter } from 'connected-react-router';

import { authReducer } from './reducers/authSlice';
import { loaderReducer } from './reducers/loaderSlice';
import { eventReducer } from './reducers/eventSlice';

export const createRootReducer = (history: any) => ({
  router: connectRouter(history),
  loader: loaderReducer,
  auth: authReducer,
  events: eventReducer,
});
