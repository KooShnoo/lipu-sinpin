import { useDispatch } from "react-redux";
import { Dispatch } from "../../state/store";
import { loadPosts } from "../../state/post";
import { useLocation, useNavigate } from "react-router-dom";

export default function Logo() {
  const dispatch: Dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const handleClick = path === "/home" ? 
    () =>  dispatch(loadPosts()) :
    () =>  navigate("/home");
  return (
    <>
      <img title="home" onClick={handleClick} className="overflow-hidden w-12 h-12 cursor-pointer" src="/lipu-sinpin.svg"  />
    </>
  );
}
