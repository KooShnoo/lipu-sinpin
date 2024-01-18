import { useSelector } from "react-redux";
import { State } from "../../state/store";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default function Post({ postId }: {postId: number}) {
  const post = useSelector((state: State) => state.posts[postId]);
  const postTime = dayjs(post.createdAt).fromNow();

  return (
    <>
      <div className="bg-white drop-shadow-md dark:bg-fb-primary p-2 rounded-lg">
        <p>{post.author.firstName} {post.author.lastName} says:</p>
        <p className="text-xs text-fb-secondary-text-light dark:text-fb-secondary-text">{postTime}</p>
        <p className="text-xl">{post.body}</p>
      </div>
    </>
  );
}