import { useAtom } from "jotai";
import { postFormType, postModalAtom } from "../../state/atoms";
import { State } from "../../state/store";
import { useSelector } from "react-redux";
import { demoPFP_URL } from "../../utils";

export default function App() {
  const [_, setPostModal] = useAtom(postModalAtom);
  const user = useSelector((state: State) => state.session.user);
  if (!user) return null;
  return (
    <>
      <div className="bg-white drop-shadow-md dark:bg-fb-primary p-2 flex gap-4 rounded-lg">
        <img id="pfp-post" src={demoPFP_URL} alt="profile picture" className="w-12 h-12 rounded-full cursor-pointer active:scale-90 transition-all" />
        <button onClick={()=>setPostModal(postFormType.CREATE)} 
          className="w-full 
          bg-fb-comment-bg-light dark:bg-fb-comment-bg  dark:hover:brightness-125 hover:brightness-90
            text-left text-fb-secondary-text-leight dark:text-fb-secondary-text transition-[filter] rounded-full px-4">
          {`What's on your mind, ${user.firstName}?`}
        </button>
      </div>
    </>
  );
}
