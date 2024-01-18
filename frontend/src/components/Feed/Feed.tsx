import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "../../state/store";
import { loadPosts, selectPostIds } from "../../state/post";
import Post from "../Post/Post";

export default function Feed() {
  const dispatch: Dispatch = useDispatch();
  const postIds = useSelector(selectPostIds);
  useEffect(() => {
    dispatch(loadPosts());
  }, []);
  return (
    <>
      <Navbar />
      {postIds.map(postId => (
        <Post key={postId} postId={postId}/>
      ))}
      <Post postId={1} />
    </>
  );
}
