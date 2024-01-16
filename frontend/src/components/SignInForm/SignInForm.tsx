import './SignInForm.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inputOnChange } from '../../utils';
import { signInUser } from '../../state/session';
import { Dispatch, State } from '../../state/store';

export default function SignInForm() {
  const dispatch: Dispatch = useDispatch();
  const loginErrors = useSelector((state: State) => state.errors.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit: React.FormEventHandler<HTMLFormElement>  = e => {
    e.preventDefault();
    dispatch(signInUser({email, password}));
  };


  const isErrorEmail = !!loginErrors;
  const isErrorPassword = !!loginErrors;
  return(
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" id="email" placeholder="Email" className={isErrorEmail ? "border-red-600" : "border-gray-300 active:border-blue-600"} aria-label="Email" value={email} onChange={inputOnChange(setEmail)} />
          {isErrorEmail && <i className="fa-lg fa-solid fa-triangle-exclamation" />}
        </div>
        <div>
          <input type="password" id="password" placeholder="Password" className={isErrorPassword ? "border-red-600" : "border-gray-300 active:border-blue-600"} aria-label="Password" value={password} onChange={inputOnChange(setPassword)} />
          {isErrorPassword && <i className="fa-lg fa-solid fa-triangle-exclamation" />}
          {loginErrors?.map(error => <p key={error} className="text-red-600">{error}</p>)}
        </div>
        <button id="sign-in">Log In</button>
        <div id="divider-line" />
        <button type="button" id="sign-up">Create new account</button>
      </form>
    </>
  );
}