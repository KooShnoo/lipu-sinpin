import { useDispatch, useSelector } from "react-redux";
import { Dispatch, State } from "../../state/store";
import { signOutUser } from "../../state/session";
import { useNavigate } from "react-router-dom";
import Theme from "./Theme";

export default function Popover() {
  const dispatch: Dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: State) => state.session.user);
  if (!user) return;
  return (
    <>
      <div className="min-w-[22rem] bg-white drop-shadow-md dark:bg-fb-primary p-2 rounded-lg flex flex-col justify-between" onClick={e => {if (e.target === e.currentTarget) e.stopPropagation();}}>
        <button className="w-full p-1 flex gap-2 justify-left items-center bg-inherit hover:bg-fb-comment-bg-light hover:dark:bg-fb-comment-bg transition-colors rounded-md" onClick={() => navigate(`/users/${user.id}`)}>
          <div className="flex justify-center items-center bg-inherit h-8 w-8 brightness-200 rounded-full">
            <i className="fa-solid fa-user" />
          </div>
          Profile
        </button>
        <button className="w-full p-1 flex gap-2 justify-left items-center bg-inherit hover:bg-fb-comment-bg-light hover:dark:bg-fb-comment-bg transition-colors rounded-md" onClick={() => dispatch(signOutUser())}>
          <div className="flex justify-center items-center bg-inherit h-8 w-8 brightness-200 rounded-full">
            <i className="fa-solid fa-right-from-bracket" />
          </div>
          Log Out
        </button>
        <Theme />
      </div>
    </>
  );
}