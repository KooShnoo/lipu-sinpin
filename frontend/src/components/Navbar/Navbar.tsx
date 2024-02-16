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
      <div className="w-screen p-2 fixed top-0 z-10 flex bg-white dark:bg-fb-primary dark:border-b-2 border-fb-comment-bg-light dark:border-fb-comment-bg">
        <div className="flex flex-1 items-center gap-4">
          <Logo />
          {isLoading && <i className=" text-2xl fa-solid fa-spinner fa-spin" />}
        </div>
        <div className="flex flex-auto gap-2 justify-center items-center">
          <a target="_blank" href="https://github.com/KooShnoo/lipu-sinpin">
            <img className="h-12 hover:bluified transition-[filter] duration-75" src="/github.svg" alt="github" />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/ishan-chawla/">
            <img className="h-12 hover:bluified transition-[filter] duration-75" src="/linkedin.svg" alt="linkedin" />
          </a>
        </div>
        <div className="flex flex-1 justify-end items-center gap-4">
          <p className="hidden sm:block"> {`Welcome, ${user.firstName}!`}</p>
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
