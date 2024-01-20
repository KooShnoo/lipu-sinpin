import { useDispatch, useSelector } from "react-redux";
import { demoPFP_URL, inputOnChange } from "../../utils";
import { Dispatch, State } from "../../state/store";
import { postPost } from "../../state/post";
import { useState } from "react";
import { useAtom } from "jotai";
import { PostFormType, postFormType, postModalAtom } from "../../state/atoms";

export default function PostForm({ type }: {type: PostFormType}) {
  const dispatch: Dispatch = useDispatch();
  const [_, setPostModal] = useAtom(postModalAtom);
  const user = useSelector((state: State) => state.session.user);
  const [body, setBody] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    setBody('');
    setPostModal(null);
    dispatch(postPost(body));
  };
  
  if (!user) return null;
  return (
    <>
      <div id="modal-background"
        onClick={(e) => {/* only dismiss on clicking background */if(e.target === e.currentTarget) setPostModal(null);}} 
        className="w-screen h-screen flex bg-black/50 fixed justify-center items-center z-50 dark:text-white" >

        <div className="bg-white drop-shadow-md dark:bg-fb-primary p-4 rounded-lg">
          <div className="flex flex-col gap-4">
            <h1 className="text-center font-bold text-xl">{type ===  postFormType.CREATE ? "Create" : "Edit"} Post</h1>
            <div className="dark:before:border-fb-secondary-text before:w-full before:border-b-2 before:absolute before:left-0"/>
            <div className="flex gap-2 items-center">
              <img id="pfp-post" src={demoPFP_URL} alt="profile picture" className="w-12 h-12 rounded-full cursor-pointer active:scale-90 transition-all" />
              <p className="text-lg">{user.firstName} {user.lastName}</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <textarea placeholder={`What's on your mind, ${user.firstName}?`} value={body} onChange={inputOnChange(setBody)} className="w-full text-2xl max-h-[500px] dark:bg-fb-primary"/>
              <button className="bg-fb-blue rounded-md p-2 text-sm">Post</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
