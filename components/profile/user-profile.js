import {useRouter} from 'next/router'
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import {useSession} from 'next-auth/client'
function UserProfile() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);
  const router = useRouter()

  const [session, isLoading] = useSession()

  if (isLoading) {
    return <p className={classes.profile}>Loading...</p>;
  }
  console.log(isLoading);
  console.log(session);

  // if(session.error == 'null'){
  //   router.push('/auth')
  // }

  async function changePasswordHandler(passwordData) {
    console.log(passwordData);
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
