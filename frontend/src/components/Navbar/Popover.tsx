import { useDispatch } from "react-redux";
import { Dispatch } from "../../state/store";
import { signOutUser } from "../../state/session";

export default function Popover() {
  const dispatch: Dispatch = useDispatch();
  return (
    <>
      <button></button>
      <button onClick={() => dispatch(signOutUser())}>logout</button>
    </>
  );
}