import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { State } from "../../state/store";
import Navbar from "../Navbar/Navbar";
import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { postModalAtom, redirectAtom } from "../../state/atoms";
import PostForm from "../Post/PostForm";

export default function Home() {
  const postModal = useAtomValue(postModalAtom);
  const user = useSelector((state: State) => state.session.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useSetAtom(redirectAtom)(pathname);
  
  useEffect(() => {
    if (!user) navigate('/');
  }, []);

  if (!user) return null;
  return (
    <>
      <div id="background" className="w-screen min-h-screen bg-fb-wash-light dark:bg-fb-wash fixed -z-10" />
      {postModal.kind === "NONE" ? null : <PostForm type={postModal} />}
      <div className="w-screen min-h-screen bg-fb-wash-light dark:bg-fb-wash dark:text-white">
        <Navbar />
        <div className="px-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
