import { useDispatch } from "react-redux";
import { signOutUser } from "../../state/session";
import { Dispatch } from "../../state/store";
import Logo from "../Logo/Logo";

export default function Navbar() {
  const dispatch: Dispatch = useDispatch();
  return (
    <>
      <div className="flex items-center gap-4">
        <Logo />
        <p>Feed</p>
        <button onClick={() => dispatch(signOutUser())}>logout</button>
      </div>
    </>
  );
}
