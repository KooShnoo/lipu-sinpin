import { Dispatch, PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { load } from "../api/csrf";
import { State, Thunk } from "./store";
import { User } from "./user";

export interface Post {
  id: number;
  authorId: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  photoUrl: string | null;
  author : User;
  likers: User[];
}

type PostsState = Record<number, Post>

const initialState: PostsState = {};

export const selectPosts = createSelector((state: State) => state.posts, posts => Object.values(posts));

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
  dispatch(setPosts(posts));
};

export const postPost = (post: FormData): Thunk => async (dispatch: Dispatch, getState) => {
  const user = getState().session.user;
  if (!user) return;
  const res = await load('/api/posts', {
    method: "POST", 
    jsonHeader: false,
    body: post,
  });
  if (!res.ok) {
    alert('failed to post post.');
    return;
  }
  const postBack: Post = await res.json();
  dispatch(addPost(postBack));
};

export const patchPost = (post: FormData): Thunk => async (dispatch: Dispatch, getState) => {
  const user = getState().session.user;
  if (!user) return;
  const res = await load(`/api/posts/${post.get('post[id]')}`, {
    method: "PATCH", 
    jsonHeader: false,
    body: post,
  });
  if (!res.ok) {
    alert('failed to edit post.');
    return;
  }
  const postBack: Post = await res.json();
  dispatch(editPost(postBack));
};

export const deletePost = (postId: number): Thunk => async (dispatch: Dispatch) => {
  await load(`/api/posts/${postId}`, {method: 'DELETE'});
  dispatch(removePost(postId));
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (_state, action: PayloadAction<Record<number, Post>>) => ({...action.payload}),
    addPosts: (state, action: PayloadAction<Record<number, Post>>) => ({...state, ...action.payload}),
    addPost: (state, action: PayloadAction<Post>) => ({...state, [action.payload.id]: action.payload}),
    editPost: (state, action: PayloadAction<Post>) => {state[action.payload.id] = action.payload;},
    removePost: (state, action: PayloadAction<number>) => {delete state[action.payload];},
  },
});

export const { setPosts, addPosts, addPost, removePost, editPost } = postsSlice.actions;
export default postsSlice.reducer;