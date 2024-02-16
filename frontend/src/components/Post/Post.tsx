import { useDispatch, useSelector } from "react-redux";
import { Dispatch, State } from "../../state/store";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { deletePost } from "../../state/post";
import { postFormEDIT, postModalAtom } from "../../state/atoms";
import { useSetAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import { demoPFP_URL } from "../../utils";
import { Post } from "../../state/post";
import { like, unlike } from "../../api/like";
import { User } from "../../state/user";
import { useState } from "react";
dayjs.extend(relativeTime);

export default function Post({ post, interactable = true }: {post: Post, interactable?: boolean}) {
  const dispatch: Dispatch = useDispatch();
  const navigate = useNavigate();
  const setPostModal = useSetAtom(postModalAtom);
  const postTime = dayjs(post.createdAt).fromNow();
  const editTime = dayjs(post.updatedAt).fromNow();
  const edited = !dayjs(post.createdAt).isSame(dayjs(post.updatedAt), 'minute');
  const user = useSelector((state: State) => state.session.user);
  const liker = interactable && post.likers.find(liker => liker.id === user?.id) || null;

  const [isShared, setIsShared] = useState(false);

  const likerLink = (liker: User) => (<Link className="hover:underline" key={liker.id} to={`/users/${liker.id}`}>{liker.firstName}</Link>); 
  const formatLikers = () => {
    if (post.likers.length === 1) {
      return <div className="flex gap-1">liked by {likerLink(post.likers[0])}</div>;
    } else if (post.likers.length === 2) {
      return <div className="flex gap-1">liked by {likerLink(post.likers[0])} and {likerLink(post.likers[1])}</div>;
    } else if (post.likers.length <= 4) {
      return <div className="flex gap-1">liked by {post.likers.slice(0, -1).map(liker=>(<p key={liker.id}>{likerLink(liker)}, </p>))}and {likerLink(post.likers.at(-1)!)}</div>;
    } else {
      return <div className="flex gap-1">liked by {post.likers.slice(0, 4).map(liker=>(<p key={liker.id}>{likerLink(liker)}, </p>))}and {post.likers.length - 4} others</div>;
    }
  };

  const handleLike = liker 
    ? () => {dispatch(unlike(post));}
    : () => {dispatch(like(post));};
  
  const handleShare = async () => {
    await navigator.clipboard.writeText(new URL(`/posts/${post.id}`, document.baseURI).href);
    setIsShared(true);
  };

  if (!user) return null;
  return (
    <>
      <div className="bg-white drop-shadow-md dark:bg-fb-primary p-2 rounded-lg flex justify-between">
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex justify-between">
            <div className="flex gap-2">

              <img id="pfp-post" src={post.author.pfpUrl || demoPFP_URL} alt="profile picture" className="w-12 h-12 rounded-full cursor-pointer active:scale-90 transition-all" onClick={() => navigate(`/users/${post.author.id}`)} />
              <div>
                <p>{post.author.firstName} {post.author.lastName} says:</p>
                <p className="text-xs text-fb-secondary-text-light dark:text-fb-secondary-text">{postTime}</p>
                {edited && <p className="text-xs italic text-fb-secondary-text-light dark:text-fb-secondary-text">edited {editTime}</p>}
              </div>
            </div>
            {(user.id === post.authorId) && <div className="flex">
              <button className="bg-inherit h-8 w-8 hover:bg-fb-comment-bg-light hover:dark:bg-fb-comment-bg rounded-full" onClick={()=>dispatch(deletePost(post.id))}>
                <i className="fa-solid fa-trash" />
              </button>
              <button className="bg-inherit h-8 w-8 hover:bg-fb-comment-bg-light hover:dark:bg-fb-comment-bg rounded-full" onClick={()=>setPostModal(postFormEDIT(post))}>
                <i className="fa-solid fa-pen-to-square" />
              </button>
            </div>}
          </div>
          <p className="text-xl">{post.body}</p>
          {post.photoUrl && <img src={post.photoUrl}/>}
          {interactable && <>
            <hr className="border-fb-comment-bg-light dark:border-fb-comment-bg"/>
            {post.likers.length > 0 && <>
              {formatLikers()}
              <hr className="border-fb-comment-bg-light dark:border-fb-comment-bg"/>
            </>}
            <div className="flex">
              <button className="w-full p-1 flex justify-center items-center bg-inherit hover:bg-fb-comment-bg-light hover:dark:bg-fb-comment-bg transition-colors rounded-md" onClick={handleLike}>
                <div className="flex justify-center items-center h-8 w-8 brightness-200 rounded-full">
                  <i className="fa-solid fa-thumbs-up" />
                </div>
                {liker ? 'Unlike' : 'Like'}
              </button>
              <button className="w-full p-1 flex justify-center items-center bg-inherit hover:bg-fb-comment-bg-light hover:dark:bg-fb-comment-bg transition-colors rounded-md" onClick={handleShare}>
                <div className="flex justify-center items-center h-8 w-8 brightness-200 rounded-full">
                  <i className="fa-solid fa-share" />
                </div>
                {isShared ? "copied!" :"Share"}
              </button>
            </div></>}
        </div>

      </div>
    </>
  );
}