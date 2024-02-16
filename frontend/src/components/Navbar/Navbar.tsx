import { useSelector } from "react-redux";
import { State } from "../../state/store";
import Logo from "../Logo/Logo";
import { demoPFP_URL } from "../../utils";
import { useEffect, useState } from "react";
import Popover from "./Popover";
import style from "./Navbar.module.css";
import { useAtomValue } from "jotai";
import { fetchingAtom } from "../../state/atoms";

export default function Navbar() {
  const user = useSelector((state: State) => state.session.user);
  const isLoading = useAtomValue(fetchingAtom);

  const windowOnClick = (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;
    if (e.target.id !== "pfp") {
      setShowPopover(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", windowOnClick);
    return () => window.removeEventListener("click", windowOnClick);
  }, []);

  const [showPopover, setShowPopover] = useState(false);
  const togglePopover = () => setShowPopover(!showPopover);

  if (!user) return null;
  return (
    <>
      <div className="w-screen p-2 fixed top-0 z-10 flex justify-between bg-white dark:bg-fb-primary dark:border-b-2 border-fb-comment-bg-light dark:border-fb-comment-bg">
        <div className="flex items-center gap-4">
          <Logo />
          {isLoading && <i className=" text-2xl fa-solid fa-spinner fa-spin" />}
        </div>
        <div className="flex items-center gap-4">
          <p> {`Welcome, ${user.firstName}!`}</p>
          <div className="relative">
            <img id="pfp" src={user.pfpUrl ||  demoPFP_URL} onClick={togglePopover} alt="profile picture" className="w-12 h-12 rounded-full cursor-pointer active:scale-90 transition-all" />
            <div className={style.popover}>
              {showPopover && <Popover />}
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen h-[calc(4rem+2px)]" />
    </>
  );
}
