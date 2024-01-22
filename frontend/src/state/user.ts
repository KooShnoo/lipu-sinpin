import { Dispatch, PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { load } from "../api/csrf";
import { State, Thunk } from "./store";

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

// export const postPost = (body: string): Thunk => async (dispatch: Dispatch, getState) => {
//   const user = getState().session.user;
//   if (!user) return;
//   const res = await load('/api/posts', {
//     method: "POST", 
//     body: JSON.stringify({author_id: user.id, body}),
//   });
//   if (!res.ok) {
//     alert('failed to post post.');
//     return;
//   }
//   const post: Post = await res.json();
//   dispatch(addPost(post));
// };

// export const patchPost = (post: Post): Thunk => async (dispatch: Dispatch, getState) => {
//   const user = getState().session.user;
//   if (!user) return;
//   const res = await load(`/api/posts/${post.id}`, {
//     method: "PATCH", 
//     body: JSON.stringify(post),
//   });
//   if (!res.ok) {
//     alert('failed to edit post.');
//     return;
//   }
//   const postBack: Post = await res.json();
//   dispatch(editPost(postBack));
// };

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