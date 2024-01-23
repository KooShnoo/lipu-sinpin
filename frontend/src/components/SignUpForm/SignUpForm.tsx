import formStyle from '../SignInForm/SignInForm.module.css';
import { useState } from 'react';
import { inputOnChange } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, State } from '../../state/store';
import { signUpUser } from '../../state/session';

export default function SignUpForm({ setShowSignUpForm }: {setShowSignUpForm: React.Dispatch<React.SetStateAction<boolean>>}) {
  const dispatch: Dispatch = useDispatch();
  const signUpErrors = useSelector((state: State) => state.errors.signUp);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const isErrorEmail = false;
  const isErrorPassword = false;
  const isErrorFirstName = false;
  const isErrorLastName = false;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    dispatch(signUpUser({first_name: firstName, last_name: lastName, email, password}));
  };

  return (
    <>
      <div id="modal-background"
        onClick={(e) => {/* only dismiss on clicking background */if(e.target === e.currentTarget) setShowSignUpForm(false);}} 
        className="w-full h-full flex bg-black/50 justify-center items-center fixed z-50">
        <form className={`w-fit ${formStyle.formContainer}`} onSubmit={handleSubmit}>
          <h1 className="text-center font-bold">Create New Account</h1>
          <div className={formStyle.divider} />
          <div className="flex gap-4">
            <div className={formStyle.inputContainer}>
              <input type="text" placeholder="First Name" 
                className={`${formStyle.input} ${isErrorFirstName ? "border-red-600" : "border-gray-300 active:border-blue-600"}`}
                aria-label="First Name" value={firstName} onChange={inputOnChange(setFirstName)} />
              {isErrorEmail && <i className="fa-lg fa-solid fa-triangle-exclamation" />}
            </div>
            <div className={formStyle.inputContainer}>
              <input type="text" placeholder="Last Name" 
                className={`${formStyle.input} ${isErrorLastName ? "border-red-600" : "border-gray-300 active:border-blue-600"}`}
                aria-label="Last Name" value={lastName} onChange={inputOnChange(setLastName)} />
              {isErrorEmail && <i className="fa-lg fa-solid fa-triangle-exclamation" />}
            </div>

          </div>
          <div className={formStyle.inputContainer}>
            <input type="text" placeholder="Email" 
              className={`${formStyle.input} ${isErrorEmail ? "border-red-600" : "border-gray-300 active:border-blue-600"}`}
              aria-label="Email" value={email} onChange={inputOnChange(setEmail)} />
            {isErrorEmail && <i className="fa-lg fa-solid fa-triangle-exclamation" />}
          </div>
          <div className={formStyle.inputContainer}>
            <input type="password" placeholder="New Password" 
              className={`${formStyle.input} ${isErrorPassword ? "border-red-600" : "border-gray-300 active:border-blue-600"}`}
              aria-label="New Password" value={password} onChange={inputOnChange(setPassword)} />
            {isErrorPassword && <i className="fa-lg fa-solid fa-triangle-exclamation" />}
            {signUpErrors?.map((error, i) => <p key={i} className="text-red-600">{error}</p>)}
          </div>
          <button className={`${formStyle.button} ${formStyle.signUp}`}>Create new account</button>
        </form>
      </div>
    </>
  );
}