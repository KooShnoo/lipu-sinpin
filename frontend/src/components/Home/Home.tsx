import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { State } from "../../state/store";
import Navbar from "../Navbar/Navbar";
import { useEffect } from "react";

export default function Home() {
  const user = useSelector((state: State) => state.session.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate('/');
  }, []);

  if (!user) return null;
  return (
    <div className="w-screen min-h-screen bg-fb-wash-light dark:bg-fb-wash dark:text-white flex flex-col gap-4">
      <Navbar />
      <Outlet />
    </div>
  );
}
