import { useDispatch, useSelector } from "react-redux";
import { Dispatch, State } from "../../state/store";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { deletePost } from "../../state/post";
import { postFormEDIT, postModalAtom } from "../../state/atoms";
import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { demoPFP_URL } from "../../utils";
import { Post } from "../../state/post";
dayjs.extend(relativeTime);

export default function Post({ post }: {post: Post}) {
  const dispatch: Dispatch = useDispatch();
  const navigate= useNavigate();
  const setPostModal = useSetAtom(postModalAtom);
  // const post = useSelector((state: State) => state.posts[postId]);
  const postTime = dayjs(post.createdAt).fromNow();
  const editTime = dayjs(post.updatedAt).fromNow();
  const edited = !dayjs(post.createdAt).isSame(dayjs(post.updatedAt), 'minute');
  const user = useSelector((state: State) => state.session.user);
  

  if (!user) return null;
  return (
    <>
      <div className="bg-white drop-shadow-md dark:bg-fb-primary p-2 rounded-lg flex justify-between">
        <div>
          <div className="flex gap-2">
            <img id="pfp-post" src={post.author.pfpUrl || demoPFP_URL} alt="profile picture" className="w-12 h-12 rounded-full cursor-pointer active:scale-90 transition-all" onClick={() => navigate(`/users/${post.author.id}`)} />
            <div>
              <p>{post.author.firstName} {post.author.lastName} says:</p>
              <p className="text-xs text-fb-secondary-text-light dark:text-fb-secondary-text">{postTime}</p>
              {edited && <p className="text-xs italic text-fb-secondary-text-light dark:text-fb-secondary-text">edited {editTime}</p>}
            </div>
          </div>
          <p className="text-xl">{post.body}</p>
          {post.photoUrl && <img src={post.photoUrl}/>}
        </div>
        {(user.id === post.authorId) && (<div className="flex">
          <button className="bg-inherit h-8 w-8 hover:bg-fb-comment-bg-light hover:dark:bg-fb-comment-bg rounded-full" onClick={()=>dispatch(deletePost(post.id))}>
            <i className="fa-solid fa-trash" />
          </button>
          <button className="bg-inherit h-8 w-8 hover:bg-fb-comment-bg-light hover:dark:bg-fb-comment-bg rounded-full" onClick={()=>setPostModal(postFormEDIT(post))}>
            <i className="fa-solid fa-pen-to-square" />
          </button>
        </div>)}
      </div>
    </>
  );
}