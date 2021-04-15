import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';


import AuthForm from '../components/auth/auth-form';

function AuthPage() {
  
  const router = useRouter();
  const [session, loading] = useSession()
  
  console.log(session);
  console.log(loading);

  if(loading){
    return <p> Loading..... </p>
  }

  if(session){
    router.replace('/profile')
  }

  return <AuthForm />;
}

export default AuthPage;
