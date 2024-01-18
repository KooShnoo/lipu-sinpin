import { useSelector } from "react-redux";
import { State } from "../../state/store";

export default function Post({ postId }: {postId: number}) {
  const post = useSelector((state: State) => state.posts[postId]);

  return (
    <>
      <p>{post.authorId} says: </p>
      <p>{post.body}</p>
    </>
  );
}