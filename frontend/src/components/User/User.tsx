import { useSelector } from "react-redux";
import { State } from "../../state/store";
import { demoPFP_URL } from "../../utils";
import { Link } from "react-router-dom";

export default function User({ userId }: {userId: number}) {
  const user = useSelector((state: State) => state.users[userId]);
  return (
    <>
      <div className="w-40 h-120 flex flex-col gap-4 bg-fb-primary p-4 rounded-lg">
        <div className="overflow-hidden ">
          <img className="rounded-lg" src={user.pfpUrl || demoPFP_URL}/>
        </div>
        <Link to={`/users/${user.id}`}>
          <h1 className="font-bold text-lg whitespace-nowrap overflow-scroll">{user.firstName} {user.lastName}</h1>
        </Link>
      </div>
    </>
  );
}