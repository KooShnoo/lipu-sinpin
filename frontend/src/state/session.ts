import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { load } from "../api/csrf";
import { Thunk } from "./store";
import { setSignInErrors, setSignUpErrors } from "./error";
import { router } from "../main";
import { jotaiStore, redirectAtom } from "./atoms";
import { User } from "./user";

interface SessionState {
  user: User | null;
}

const initialState: SessionState = {
  user: null,
};

// if only i could use react-query...

export const signUpUser = (user: {first_name: string, last_name: string, email: string, password: string}): Thunk => async (dispatch: Dispatch) => {
  const res = await load('/api/users', {
    method: 'POST',
    body: JSON.stringify({user}),
  });
  if (res.status === 422 /* bad data */) {
    const errors: {errors: string[]} = (await res.json());
    dispatch(setSignUpErrors(errors));
  } else if (!res.ok) {
    dispatch(setSignUpErrors({errors: ["an unexpected error occured. please try to sign in again."]}));
  } else {
    const user: User = await res.json();
    finishSignInUser(user, dispatch);
  }
};

export const signInUser = (credentials: {email: string, password: string}): Thunk => async (dispatch: Dispatch) => {
  const res = await load('/api/session', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  if (res.status === 401 /* unauthorized */) {
    const errors: {errors: string[]} = (await res.json());
    dispatch(setSignInErrors(errors));
  } else if (!res.ok) {
    dispatch(setSignInErrors({errors: ["an unexpected error occured. please try to sign in again."]}));
  } else {
    const user: User = await res.json();
    finishSignInUser(user, dispatch);
  }
};

const finishSignInUser = (user: User, dispatch: Dispatch) => {
  console.log('usah', user);
  dispatch(setUser({ user }));
  const redirect = jotaiStore.get(redirectAtom);
  router.navigate(redirect || "/home");
};

export const signOutUser = (): Thunk => async (dispatch: Dispatch) => {
  const res = await load('/api/session', {method: 'DELETE'});
  if (!res.ok) {
    alert('failed to sign out.');
  } else {
    dispatch(clearUser());
    router.navigate("/");
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