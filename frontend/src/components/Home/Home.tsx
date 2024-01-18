import { useSelector } from "react-redux";
import Feed from "../Feed/Feed";
import { useNavigate } from "react-router-dom";
import { State } from "../../state/store";
import { useEffect } from "react";

export default function Home() {
  const user = useSelector((state: State) => state.session.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
  }, []);
  return (
    <div className="w-screen h-screen bg-fb-wash-light dark:bg-fb-wash dark:text-white">
      <Feed />

    </div>
  );
}
