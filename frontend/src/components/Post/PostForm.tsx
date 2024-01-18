import { useDispatch, useSelector } from "react-redux";
import { demoPFP_URL, inputOnChange } from "../../utils";
import { Dispatch, State } from "../../state/store";
import { postPost } from "../../state/post";
import { useState } from "react";

export default function PostForm() {
  const dispatch: Dispatch = useDispatch();
  const user = useSelector((state: State) => state.session.user);
  const [body, setBody] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    setBody('');
    dispatch(postPost(body));
  };

  if (!user) return null;
  return (
    <>
      <div className="bg-white drop-shadow-md dark:bg-fb-primary p-2 rounded-lg">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <img id="pfp-post" src={demoPFP_URL} alt="profile picture" className="w-12 h-12 rounded-full cursor-pointer active:scale-90 transition-all" />
          <input type="text" placeholder={`What's on your mind, ${user.firstName}?`} value={body} onChange={inputOnChange(setBody)} className="w-full bg-fb-comment-bg-light dark:bg-fb-comment-bg rounded-full px-4"/>
        </form>
      </div>
    </>
  );
}
