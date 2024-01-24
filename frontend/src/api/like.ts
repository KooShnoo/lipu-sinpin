import { Dispatch } from "@reduxjs/toolkit";
import { Post, editPost } from "../state/post";
import { Thunk } from "../state/store";
import { load } from "./csrf";

export const like = (post: Post): Thunk => async (dispatch: Dispatch) => {
  const res = await load('/api/likes', {
    method: 'POST',
    body: JSON.stringify({
      like: {
        liked_id: post.id,
      },
    }),
  });
  if (!res.ok) return;
  const postBack = await res.json();
  dispatch(editPost(postBack));
};

export const unlike = (post: Post): Thunk => async (dispatch: Dispatch) => {
  const res = await load(`/api/posts/${post.id}/likes`, {
    method: 'DELETE',
  });
  if (!res.ok) return;
  const postBack = await res.json();
  dispatch(editPost(postBack));
};