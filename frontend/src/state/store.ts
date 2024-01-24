import { ThunkAction, UnknownAction, configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session';
import errorReducer from './error';
import postReducer from './post';
import userReducer from './user';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    errors: errorReducer,
    posts: postReducer,
    users: userReducer,
  },
  devTools: import.meta.env.PROD,
});
console.log(`we are ${import.meta.env.PROD ? '' : 'not '}in prod mode!`);

export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
export type Thunk<ReturnType = void> = ThunkAction<ReturnType, State, unknown, UnknownAction>