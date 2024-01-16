import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { load } from "../api/csrf";
import { Thunk } from "./store";
import { setSignInErrors, setSignUpErrors } from "./error";
import { router } from "../main";

export interface User {
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

export const signUpUser = (user: {first_name: string, last_name: string, email: string, password: string}): Thunk => async (dispatch: Dispatch) => {
  console.log(user);
  console.log(user.password);
  const res = await load('/api/users', {
    method: 'POST',
    body: JSON.stringify({user}),
  });
  if (res.status === 422 /* bad data */) {
    const errors: {errors: string[]} = (await res.json());
    dispatch(setSignUpErrors(errors));
  } else if (res.status >= 500 /* server error */) {
    dispatch(setSignUpErrors({errors: ["our servers are currently offline. note that they turn themselves off, so they may take three minutes or more to turn back on."]}));
  } else if (!res.ok) {
    dispatch(setSignUpErrors({errors: ["an unexpected error occured. please try to sign in again."]}));
  } else {
    const user: {user: User} = await res.json();
    dispatch(setUser(user));
    alert(`logged in ${user.user.firstName}`);
  }
};

export const signInUser = (credentials: {email: string, password: string}): Thunk => async (dispatch: Dispatch) => {
  const res = await load('/api/session', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  if (res.status === 401 /* unauthorized */) {
    const errors: {errors: string[]} = (await res.json());
    console.log(errors);
    dispatch(setSignInErrors(errors));
  } else if (res.status >= 500 /* server error */) {
    dispatch(setSignInErrors({errors: ["our servers are currently offline. note that they turn themselves off, so they may take three minutes or more to turn back on."]}));
  } else if (!res.ok) {
    dispatch(setSignInErrors({errors: ["an unexpected error occured. please try to sign in again."]}));
  } else {
    const user: {user: User} = await res.json();
    dispatch(setUser(user));
    alert(`logged in ${user.user.firstName}`);
    router.navigate("/home")
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