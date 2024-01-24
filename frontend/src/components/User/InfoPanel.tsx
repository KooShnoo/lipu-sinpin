import { useState } from "react";
import { User, patchUser } from "../../state/user";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, State } from "../../state/store";

export default function InfoPanel({user}: {user: User}) {
  const currentUser = user.id === useSelector((state: State) => state.session.user?.id);
  const [status, setStatus] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const dispatch: Dispatch = useDispatch();
  const dirty = !(status === null && bio === null);
  const clean = () => {
    setStatus(null);
    setBio(null);
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement>  = e => {
    e.preventDefault();
    dispatch(patchUser({
      status: status || undefined,
      bio: bio || undefined,
    }));
    clean();
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white drop-shadow-md dark:bg-fb-primary p-2 flex flex-col gap-4 rounded-lg text-xl">
        <h3>Info</h3>
        <hr />
        {/* <p>Birthday: {user.birthday || "never born lol"}</p> */}
        <p>
          Bio: { bio !== null 
            ? <input type="text" className="bg-inherit border-fb-secondary-text border-2 box-content p-2 rounded-lg" value={bio} placeholder="Bio" onChange={e => setBio(e.target.value)} />
            : user.bio || "nothing interesting about this person lol"}
          {bio === null && currentUser && <button className="bg-inherit h-8 w-8 hover:bg-fb-comment-bg-light hover:dark:bg-fb-comment-bg rounded-full" onClick={e =>{e.preventDefault(); setBio('');}}>
            <i className="fa-solid fa-pen-to-square" />
          </button>}
        </p>
        {/* <p>Location: {user.location || "doesn't exist anywhere lol"}</p> */}
        <p>
          Status: { status !== null
            ? <input type="text" className="bg-inherit border-fb-secondary-text border-2 box-content p-2 rounded-lg" value={status} placeholder="Status" onChange={e => setStatus(e.target.value)} />
            : user.status || "not up to anything lol"}
          {status === null && currentUser && <button className="bg-inherit h-8 w-8 hover:bg-fb-comment-bg-light hover:dark:bg-fb-comment-bg rounded-full" onClick={e =>{e.preventDefault(); setStatus('');}}>
            <i className="fa-solid fa-pen-to-square" />
          </button>}
        </p>
        {dirty && <div className="flex gap-4">
          <button className="bg-fb-blue text-white dark:hover:brightness-125 hover:brightness-90 rounded-lg p-2">save</button>
          <button className="bg-fb-comment-bg-light dark:bg-fb-comment-bg dark:hover:brightness-125 hover:brightness-90 rounded-lg p-2" onClick={clean}>cancel</button>
        </div>}
      </form>
    </>
  );
}



