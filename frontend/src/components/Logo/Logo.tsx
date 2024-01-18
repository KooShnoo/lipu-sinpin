import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();
  return (
    <>
      <div title="home" onClick={() => navigate('/home')} className="bg-fb-blue overflow-hidden w-[3.5rem] h-[3.5rem] scale-[calc(6/7)] cursor-pointer rounded-full"> 
        <p className="text-6xl font-bold font-[Facebook] text-white w-fit relative left-[8px] top-[7px]"> 
          ls
        </p>
      </div>
    </>
  );
}
