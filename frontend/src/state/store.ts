import { ThunkAction, UnknownAction, configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session';
import errorReducer from './error';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    errors: errorReducer,
  },
});

export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
export type Thunk<ReturnType = void> = ThunkAction<ReturnType, State, unknown, UnknownAction>