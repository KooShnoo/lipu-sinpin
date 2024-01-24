import { useDispatch, useSelector } from "react-redux";
import { demoPFP_URL, inputOnChange } from "../../utils";
import { Dispatch, State } from "../../state/store";
import { patchPost, postPost } from "../../state/post";
import { useRef, useState } from "react";
import { PostFormData, postFormNONE, postModalAtom } from "../../state/atoms";
import { useSetAtom } from "jotai";

export default function PostForm({ type }: {type: PostFormData}) {
  const isEditForm = type.kind === "EDIT";
  const dispatch: Dispatch = useDispatch();
  const setPostModal = useSetAtom(postModalAtom);
  const user = useSelector((state: State) => state.session.user);
  const [body, setBody] = useState(isEditForm ? type.post.body : '');
  const [error, setError] = useState('');
  const inputElement = useRef<HTMLInputElement | null>(null);

  // i wish if statements were expressions. that would make this a lot cleaner.
  /* eslint-disable indent */
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
      e.preventDefault();
      if (!user) return null;
      if (body.length <= 0) {
        setError('cannot post empty post.');
        return;
      }
      if (body.length >= 1000) {
        setError('post is too long.');
        return;
      }

      const fd = new FormData();
      fd.append('post[body]', body);
      if (inputElement.current?.files?.length === 1) fd.append('post[photo]', inputElement.current.files[0]);
      if (isEditForm) {
        fd.append('post[id]', type.post.id.toFixed());
        dispatch(patchPost(fd));
      } else {
        fd.append('post[author_id]', user.id.toFixed());
        dispatch(postPost(fd));
      }
      setBody('');
      setPostModal(postFormNONE());
    };
  /* eslint-enable indent */
  if (!user) return null;
  return (
    <>
      <div id="modal-background"
        onClick={(e) => {/* only dismiss on clicking background */if(e.target === e.currentTarget) setPostModal(postFormNONE());}} 
        className="w-screen h-screen flex bg-black/50 fixed justify-center items-center z-50 dark:text-white" >

        <div className="bg-white drop-shadow-md dark:bg-fb-primary p-4 rounded-lg">
          <div className="flex flex-col gap-4">
            <h1 className="text-center font-bold text-xl">{isEditForm ? "Edit" : "Create"} Post</h1>
            <div className="dark:before:border-fb-secondary-text before:w-full before:border-b-2 before:absolute before:left-0"/>
            <div className="flex gap-2 items-center">
              <img id="pfp-post" src={demoPFP_URL} alt="profile picture" className="w-12 h-12 rounded-full cursor-pointer active:scale-90 transition-all" />
              <p className="text-lg">{user.firstName} {user.lastName}</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <textarea placeholder={`What's on your mind, ${user.firstName}?`} value={body} onChange={inputOnChange(setBody)} className="w-full text-2xl max-h-[500px] dark:bg-fb-primary"/>
              <input type="file" ref={inputElement} />
              {error && <p className="text-red-500">{error}</p>}
              <button className="bg-fb-blue text-white dark:hover:brightness-125 hover:brightness-90 rounded-md p-2 text-sm">{ isEditForm ? "Save" : "Post"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
