import SignInForm from '../SignInForm/SignInForm';
import './App.css';

export default function App() {
  
  return (
    <>
      <div className="mx-auto pb-[8rem] pt-[6rem] max-w-[64rem] h-full lg:flex alg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 lg:self-baseline max-w-[32rem]">
          <h1 className="pt-[6rem] text-6xl font-[Facebook] font-bold text-fb-blue">lipu sinpin</h1>
          <h3 className="text-3xl">Connect with friends and the world around you on Facebook.</h3>
        </div>
        <div className="w-[24rem] flex h-full items-center justify-center content-center">
          <SignInForm />
        </div>
      </div>
    </>
  );
}
