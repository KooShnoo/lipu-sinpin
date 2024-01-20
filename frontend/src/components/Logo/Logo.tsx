import { useDispatch } from "react-redux";
import { Dispatch } from "../../state/store";
import { loadPosts } from "../../state/post";

export default function Logo() {
  const dispatch: Dispatch = useDispatch();
  return (
    <>
      <div title="home" onClick={() => dispatch(loadPosts())} className="bg-fb-blue overflow-hidden w-[3.5rem] h-[3.5rem] scale-[calc(6/7)] cursor-pointer rounded-full"> 
        <p className="text-6xl font-bold font-[Facebook] text-white w-fit relative left-[8px] top-[7px]"> 
          ls
        </p>
      </div>
    </>
  );
}
