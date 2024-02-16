import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SignUpErrors {
  email:string[];
  first_name:string[];
  last_name:string[];
  password:string[];
}

interface ErrorsState {
  signIn: string[] | null;
  signUp: SignUpErrors| string | null;
}

const initialState: ErrorsState = {
  signIn: null,
  signUp: null,
};

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setSignInErrors: (state, action: PayloadAction<{errors: string[]}>) => {state.signIn = action.payload.errors;},
    clearSignInErrors: state => {state.signIn = null;},
    setSignUpErrors: (state, action: PayloadAction<{errors: SignUpErrors | string}>) => {state.signUp = action.payload.errors;},
    clearSignUpErrors: state => {state.signUp = null;},
  },
});

export const { setSignInErrors, setSignUpErrors } = errorsSlice.actions;
export default errorsSlice.reducer;