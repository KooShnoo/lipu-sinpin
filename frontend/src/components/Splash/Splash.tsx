import SignInForm from '../SignInForm/SignInForm';
import './Splash.css';

export default function Splash() {
  
  return (
    <>
      <div className="mx-auto pb-[8rem] pt-[6rem] px-10 max-w-[64rem] h-full flex flex-col lg:flex-row items-center lg:justify-between">
        <div className="flex flex-col gap-4 lg:self-baseline max-w-[32rem]">
          <h1 className="pt-[6rem] text-6xl text-center lg:text-left font-[Facebook] font-bold text-fb-blue">lipu sinpin</h1>
          <h3 className="text-3xl text-center lg:text-left">Connect with friends and the world around you on Facebook.</h3>
        </div>
        <div className=" w-[16rem] sm:w-[24rem] mt-10 flex h-full items-baseline justify-center">
          <SignInForm />
        </div>
      </div>
    </>
  );
}
