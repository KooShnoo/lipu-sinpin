import { Dispatch, PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { load } from "../api/csrf";
import { State, Thunk } from "./store";
import { Post } from "./post";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  status: string;
  location: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  pfpUrl: string;
  coverUrl: string;
  posts: Post[];
}

type UsersState = Record<number, User>

const initialState: UsersState = {};

export const selectUserIds = createSelector((state: State) => state.users, users => Object.values(users).map(user => user.id));

export const loadUsers = (): Thunk => async (dispatch: Dispatch) => {
  const res = await load('/api/users');
  if (!res.ok) {
    alert('failed to fetch users.');
    return;
  }
  const data: User[] = await res.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const users: Record<number, User> = data.reduce((byIds: any, user)=>{
    byIds[user.id] = user;
    return byIds;
  },{});
  dispatch(setUsers(users));
};

export const patchUser = (userData: FormData): Thunk => async (dispatch: Dispatch, getState) => {
  const user = getState().session.user;
  if (!user) return;
  const res = await load(`/api/users/${userData.get('id')}`, {
    method: "PATCH", 
    jsonHeader: false,
    body: userData,
  });
  if (!res.ok) {
    alert('failed to edit user.');
    return;
  }
  const userBack: User = await res.json();
  dispatch(editUser(userBack));
};

// export const deletePost = (postId: number): Thunk => async (dispatch: Dispatch) => {
//   await load(`/api/posts/${postId}`, {method: 'DELETE'});
//   dispatch(removePost(postId));
// };

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (_state, action: PayloadAction<Record<number, User>>) => ({...action.payload}),
    addUsers: (state, action: PayloadAction<Record<number, User>>) => ({...state, ...action.payload}),
    addUser: (state, action: PayloadAction<User>) => ({...state, [action.payload.id]: action.payload}),
    editUser: (state, action: PayloadAction<User>) => {state[action.payload.id] = action.payload;},
    removeUser: (state, action: PayloadAction<number>) => {delete state[action.payload];},
  },
});

export const { setUsers, addUsers, addUser, editUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;