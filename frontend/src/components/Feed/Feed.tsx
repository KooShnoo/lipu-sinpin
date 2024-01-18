import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "../../state/store";
import { loadPosts, selectPostIds } from "../../state/post";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";

export default function Feed() {
  const dispatch: Dispatch = useDispatch();
  const postIds = useSelector(selectPostIds);
  useEffect(() => {
    dispatch(loadPosts());
  }, []);
  return (
    <>
      <div className="w-full mx-auto max-w-[42rem] flex flex-col gap-4">

        <PostForm />
        {postIds.toReversed().map(postId => (
          <Post key={postId} postId={postId}/>
        ))}
        <div className="text-center py-[25vh]">
          <h2 className="text-4xl font-bold">you're all caught up!</h2>
          <h3 className="text-xl text-fb-secondary-text-light dark:text-fb-secondary-text">you've seen all posts.</h3>
        </div>
      </div>
    </>
  );
}
