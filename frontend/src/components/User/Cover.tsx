import { useDispatch, useSelector } from "react-redux";
import { loadUsers, patchUser } from "../../state/user";
import { demoPFP_URL } from "../../utils";
import { Dispatch, State } from "../../state/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Cover() {
  const dispatch: Dispatch = useDispatch();
  const params = useParams();
  if (!params.userId) return "oopsies!!! no params D:";
  const userId = parseInt(params.userId);
  if (Number.isNaN(userId)) return "oopsies!!! NaN params D:";
  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  const user = useSelector((state: State) => state.users[userId]);
  const currentUser = user.id === useSelector((state: State) => state.session.user?.id);

  let editing: "COVER" | "PFP" | null = null; 
  const finput = document.createElement('input');
  finput.type = 'file';
  finput.onchange = e => { 
    const files = (e.target! as HTMLInputElement).files;
    if (!files) return;
    const fd = new FormData();
    fd.append(`user[${editing === "COVER" ? 'cover' : 'pfp'}]`, files[0]);
    console.log(fd);
    
    dispatch(patchUser(fd));
  };

  const handleChangeCover = () => {
    editing = "COVER";
    finput.click();
  };
  const handleChangePfp = () => {
    editing = "PFP";
    finput.click();
  };
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="max-w-[80rem] w-full relative bg-fb-primary">
          <div className=" aspect-[2.7/1] overflow-hidden">
            {user.coverUrl 
              ? <img className="object-contain w-full" src={user.coverUrl} alt={`Cover Photo for ${user.firstName} ${user.lastName}`} /> 
              : <div className="w-full h-full flex justify-center items-center">
                <h1 className="text-6xl">no cover pic</h1>
              </div>}
          </div>
          {currentUser && <button className="p-2 rounded-lg text-xl flex gap-2 items-center bg-fb-comment-bg-light dark:bg-fb-comment-bg absolute right-2 -translate-y-[3.25rem] active:scale-95 transition-all" onClick={handleChangeCover}>
            <i className="fa-solid fa-file-image" />
            <p className="hidden sm:block">{user.coverUrl ? "Change" : "Add"} Cover Photo</p>
          </button>}
          <img src={user.pfpUrl ||  demoPFP_URL} alt="profile picture" className="w-40 h-40 absolute -bottom-20 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-8 rounded-full" />
          <div className="hidden absolute left-[50%] -translate-x-[4rem] sm:translate-x-0 sm:left-auto sm:flex gap-4">
            {/* haha */}
            <div className="min-w-40 min-h-40 sm:ml-8 -mt-20" />
            <h3 className="text-3xl font-bold">{user.firstName} {user.lastName}</h3>
          </div>
          {currentUser && <div className="absolute left-[50%] -translate-x-[6rem] sm:translate-x-0 sm:left-auto flex">
            {/* lol */}
            <div className="min-w-40 min-h-40 ml-8 -mt-20" />
            <button className="w-10 h-10 flex justify-center items-center rounded-full relative bg-fb-wash right-12 top-8 text-2xl" onClick={handleChangePfp}>
              <i className="fa-solid fa-file-image" />
            </button>
          </div>}
        </div>
      </div>
      {/* lmao i may actually be the worlds messiest markup author */}
      <div className="w-[10rem] h-[10rem] ml-8 -mt-20" />
      <h3 className="sm:hidden text-center mb-4 text-3xl font-bold">{user.firstName} {user.lastName}</h3>
    </>
  );
}
