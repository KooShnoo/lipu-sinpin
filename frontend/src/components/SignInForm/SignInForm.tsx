import style from'./SignInForm.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { demoUser, inputOnChange } from '../../utils';
import { signInUser } from '../../state/session';
import { Dispatch, State } from '../../state/store';

export default function SignInForm({ setShowSignUpForm }: {setShowSignUpForm: React.Dispatch<React.SetStateAction<boolean>>}) {
  const dispatch: Dispatch = useDispatch();
  const signInErrors = useSelector((state: State) => state.errors.signIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    dispatch(signInUser({email, password}));
  };


  const isErrorEmail = !!signInErrors;
  const isErrorPassword = !!signInErrors;
  return(
    <>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <div className={style.inputContainer}>
          <input type="text" placeholder="Email" 
            className={`${style.input} ${isErrorEmail ? "border-red-600" : "border-gray-300 active:border-blue-600"}`}
            aria-label="Email" value={email} onChange={inputOnChange(setEmail)} />
          {isErrorEmail && <i className="fa-lg fa-solid fa-triangle-exclamation" />}
        </div>
        <div className={style.inputContainer}>
          <input type="password" placeholder="Password" 
            className={`${style.input} ${isErrorPassword ? "border-red-600" : "border-gray-300 active:border-blue-600"}`}
            aria-label="Password" value={password} onChange={inputOnChange(setPassword)} />
          {isErrorPassword && <i className="fa-lg fa-solid fa-triangle-exclamation" />}
          {signInErrors?.map(error => <p key={error} className="text-red-600">{error}</p>)}
        </div>
        <button className={`${style.button} ${style.signIn}`}>Log In</button>
        <p className={style.demoSignIn} onClick={() => dispatch(signInUser(demoUser))}><span>Sign in as Demo User</span></p>
        <div className={style.divider} />
        <button className={`${style.button} ${style.signUp}`} onClick={() => setShowSignUpForm(true)} type="button" >Create new account</button>
      </form>
    </>
  );
}