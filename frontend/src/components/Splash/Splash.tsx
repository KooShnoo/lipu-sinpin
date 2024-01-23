import { useState } from 'react';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';

export default function Splash() {
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  
  return (
    <>
      <div className="h-screen w-screen bg-[#f0f2f5]">
        {showSignUpForm && <SignUpForm setShowSignUpForm={setShowSignUpForm} />}
        <div className="mx-auto pb-[8rem] pt-[6rem] px-10 max-w-[64rem] h-full flex flex-col lg:flex-row items-center lg:justify-between">
          <div className="flex flex-col gap-4 lg:self-baseline max-w-[32rem]">
            <h1 className="pt-[6rem] text-6xl text-center lg:text-left font-[Facebook] font-bold text-fb-blue">lipu sinpin</h1>
            <h4 className="text-2xl -mt-4 text-center italic lg:text-left">a fakebook (fake facebook)</h4>
            <h3 className="text-3xl text-center lg:text-left">Connect with friends and the world around you on lipu sinpin.</h3>
          </div>
          <div className=" w-[16rem] sm:w-[24rem] mt-10 flex h-full items-baseline justify-center">
            <SignInForm setShowSignUpForm={setShowSignUpForm} />
          </div>
        </div>
      </div>
    </>
  );
}
