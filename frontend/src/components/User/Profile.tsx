import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Dispatch, State } from "../../state/store";
import { useEffect } from "react";
import { loadUsers } from "../../state/user";
import Cover from "./Cover";
import Post from "../Post/Post";
import InfoPanel from "./InfoPanel";

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
      <div className="max-w-[70rem] mx-auto mb-8 w-full relative">
        <Cover />
        <div className="flex flex-col mt-4 sm:flex-row gap-8">

          <div className="w-full flex flex-col gap-4">
            <InfoPanel user={user} />
          </div>

          <div className="w-full flex flex-col gap-4">
            <div className="bg-white drop-shadow-md dark:bg-fb-primary p-2 flex gap-4 rounded-lg text-xl">Posts: </div>
            {user.posts.toReversed().map(post => {
              post = {...post, author: user};
              return <Post key={post.id} post={post}/>;
            })}
          </div>

        </div>
      </div>
    </>
  );
}
