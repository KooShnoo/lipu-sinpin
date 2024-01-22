import { useSelector } from "react-redux";
import { State } from "../../state/store";

export default function User({ userId }: {userId: number}) {
  const user = useSelector((state: State) => state.users[userId]);
  return (
    <>
      <h1> here;s a suer: {user.firstName}</h1>
    </>
  );
}