import { Dispatch, PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { load } from "../api/csrf";
import { State, Thunk } from "./store";

export interface Post {
  id: number;
  authorId: number;
  body: string;
}

type PostsState = Record<number, Post>

const initialState: PostsState = {
  1: {
    id: 1,
    authorId: 1,
    body: "fake post >:)",
  },
};

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

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (_state, action: PayloadAction<Record<number, Post>>) => ({...action.payload}),
    addPosts: (state, action: PayloadAction<Record<number, Post>>) => ({...state, ...action.payload}),
  },
});

export const { setPosts, addPosts } = postsSlice.actions;
export default postsSlice.reducer;