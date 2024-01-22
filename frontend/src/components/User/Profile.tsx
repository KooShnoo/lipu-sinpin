import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Dispatch, State } from "../../state/store";
import { useEffect } from "react";
import { loadUsers } from "../../state/user";

export default function Profile() {
  const dispatch: Dispatch = useDispatch();
  const params = useParams();
  if (!params.userId) return "oopsies!!! no params D:";
  const userId = parseInt(params.userId);
  if (Number.isNaN(userId)) return "oopsies!!! NaN params D:";
  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  const user = useSelector((state: State) => state.users[userId]);
  if (!user) return "loading...";
  return (
    <>
      <h1 className="text-4xl text-center">profile for {user.firstName} {user.lastName}!</h1>
    </>
  );
}
