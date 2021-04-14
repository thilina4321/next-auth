import { useRef, useState } from 'react';
import classes from './auth-form.module.css';
import {signIn} from 'next-auth/client'

function AuthForm() {
  
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin(!isLogin)
  }

  const onSubmit = async(e)=>{
    e.preventDefault()
    const email = emailInputRef.current.value
    const password = passwordInputRef.current.value

    if(isLogin){
      const result = await signIn('credentials', {redirect:false, 
        email,password
      })
      console.log(result);
    }else{
      try {
        const res = await fetch('/api/auth/signup',{
          method:'POST',
          body:JSON.stringify({email, password}),
          headers:{'Content-Type':'application/json'}
        })
        if(!res.ok){
          throw new Error({error:'Something went wrong'})
        }
        const resData = await res.json()
        console.log(resData);
      } catch (error) {
        console.log(error.message);
      }
    }
    
  }

  

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={onSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
