import { User } from "../../state/user";

export default function InfoPanel({user}: {user: User}) {
  return (
    <>
      <div className="bg-white drop-shadow-md dark:bg-fb-primary p-2 flex flex-col gap-4 rounded-lg text-xl">
        <h3>Info</h3>
        <hr />
        <p>Birthday: {user.birthday || "never born lol"}</p>
        <p>Bio: {user.bio || "nothing interesting about this person lol"}</p>
        <p>Location: {user.location || "doesn't exist anywhere lol"}</p>
        <p>Status: {user.status || "not up to anything lol"}</p>
      </div>
    </>
  );
}



