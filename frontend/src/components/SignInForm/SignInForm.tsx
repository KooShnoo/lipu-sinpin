import { useState } from 'react';
import './SignInForm.css';
import { inputOnChange } from '../../utils';

export default function SignInForm() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit: React.FormEventHandler<HTMLFormElement>  = e => {
    e.preventDefault();
    
  }
  return(
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" id="email" placeholder="Email or phone number" aria-label="Email or phone number" value={email} onChange={inputOnChange(setEmail)}></input>
        <input type="password" id="password" placeholder="Password" aria-label="Password" value={password} onChange={inputOnChange(setPassword)}></input>
        <button>Log In</button>
      </form>
    </>
  );
}