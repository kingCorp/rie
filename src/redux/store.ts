import { configureStore, ThunkDispatch, Action } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createRootReducer } from './rootReducer';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: createRootReducer(history),
  middleware: [routerMiddleware(history), thunk],
  devTools: process.env.NODE_ENV === 'production' ? false : true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
