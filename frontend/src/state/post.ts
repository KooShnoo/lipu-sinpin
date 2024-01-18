import { Dispatch, PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { load } from "../api/csrf";
import { State, Thunk } from "./store";
import { User } from "./session";

export interface Post {
  id: number;
  authorId: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  author : User
}

type PostsState = Record<number, Post>

const initialState: PostsState = {};

export const selectPostIds = createSelector((state: State) => state.posts, posts => Object.values(posts).map(post => post.id));

export const loadPosts = (): Thunk => async (dispatch: Dispatch) => {
  const res = await load('/api/posts');
  if (!res.ok) {
    alert('failed to fetch posts.');
    return;
  }
  const data: Post[] = await res.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts: Record<number, Post> = data.reduce((byIds: any, post)=>{
    byIds[post.id] = post;
    return byIds;
  },{});
  dispatch(addPosts(posts));
};

export const postPost = (body: string): Thunk => async (dispatch: Dispatch, getState) => {
  const user = getState().session.user;
  if (!user) return;
  const res = await load('/api/posts', {
    method: "POST", 
    body: JSON.stringify({author_id: user.id, body}),
  });
  if (!res.ok) {
    alert('failed to post post.');
    return;
  }
  const post: Post = await res.json();
  dispatch(addPost(post));
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (_state, action: PayloadAction<Record<number, Post>>) => ({...action.payload}),
    addPosts: (state, action: PayloadAction<Record<number, Post>>) => ({...state, ...action.payload}),
    addPost: (state, action: PayloadAction<Post>) => ({...state, [action.payload.id]: action.payload}),
  },
});

export const { setPosts, addPosts, addPost } = postsSlice.actions;
export default postsSlice.reducer;