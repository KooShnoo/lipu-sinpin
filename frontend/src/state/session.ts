import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { load } from "../api/csrf";
import { Thunk } from "./store";
import { setLoginErrors } from "./error";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  status: string;
  location: string;
  bio: string;
}

interface SessionState {
  user: User | null;
}

const initialState: SessionState = {
  user: null,
};

export const signInUser = (credentials: {email: string, password: string}): Thunk => async (dispatch: Dispatch) => {
  const res = await load('/api/session', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  if (res.status === 401/* unauthorized */) {
    const errors: {errors: string[]} = (await res.json());
    console.log(errors);
    dispatch(setLoginErrors(errors));
  } else if (res.status >= 500 /* server error */) {
    dispatch(setLoginErrors({errors: ["our servers are currently offline. note that they turn themselves off, so they may take three minutes or more to turn back on."]}));
  } else if (!res.ok) {
    dispatch(setLoginErrors({errors: ["an unexpected error occured. please try to sign in again."]}));
    alert('oopsies!');
  } else {
    const user: {user: User} = await res.json();
    dispatch(setUser(user));
    alert(`logged in ${user.user.firstName}`);
  }
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{user: User}>) => {state.user = action.payload.user;},
    clearUser: state => {state.user = null;},
  },
});

export const { setUser, clearUser } = sessionSlice.actions;
export default sessionSlice.reducer;