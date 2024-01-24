import { useDispatch, useSelector } from "react-redux";
import { Dispatch, State } from "../../state/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { loadPosts } from "../../state/post";
import Post from "./Post";

export default function PostPage() {
  const dispatch: Dispatch = useDispatch();
  const params = useParams();
  if (!params.postId) return "oopsies!!! no params D:";
  const postId = parseInt(params.postId);
  if (Number.isNaN(postId)) return "oopsies!!! NaN params D:";
  const post = useSelector((state: State) => state.posts[postId]);
  useEffect(() => {
    if (!post) dispatch(loadPosts());
  }, []);
  if (!post) return "loading...";
  return (
    <div className="mt-4">
      <Post post={post} />
    </div>
  );
}

