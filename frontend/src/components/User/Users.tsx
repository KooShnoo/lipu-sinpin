import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "../../state/store";
import { useEffect } from "react";
import { loadUsers, selectUserIds } from "../../state/user";
import User from "./User";

export default function Users() {
  const dispatch: Dispatch = useDispatch();
  const userIds = useSelector(selectUserIds);
  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  return (
    <>
      <div className="flex flex-wrap mt-2 justify-center gap-8">
        {userIds.map(userId => (
          <User key={userId} userId={userId} />
        ))}
      </div>
    </>
  );
}
