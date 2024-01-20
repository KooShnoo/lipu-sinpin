import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { State } from "../../state/store";
import Navbar from "../Navbar/Navbar";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { postModalAtom } from "../../state/atoms";
import PostForm from "../Post/PostForm";

export default function Home() {
  const [ postModal ] = useAtom(postModalAtom);
  const user = useSelector((state: State) => state.session.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate('/');
  }, []);

  if (!user) return null;
  return (
    <>
      <div id="background" className="w-screen min-h-screen bg-fb-wash-light dark:bg-fb-wash fixed -z-10" />
      {postModal === null ? null : <PostForm type={postModal} />}
      <div className="w-screen min-h-screen bg-fb-wash-light dark:bg-fb-wash dark:text-white flex flex-col gap-4">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}
