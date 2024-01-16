import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { load } from "../api/csrf";
// import { Thunk } from "./store";

interface ErrorsState {
  login: string[] | null;
  postForm: string[] | null;
}

const initialState: ErrorsState = {
  login: null,
  postForm: null,
};

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setLoginErrors: (state, action: PayloadAction<{errors: string[]}>) => {state.login = action.payload.errors;},
    clearLoginErrors: state => {state.login = null;},
  },
});

export const { setLoginErrors: setLoginErrors } = errorsSlice.actions;
export default errorsSlice.reducer;