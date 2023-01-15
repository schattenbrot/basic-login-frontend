import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from './mainNavigation.module.scss';
import Image from 'next/image';
import { User } from '../../models/user';
import { getOwnUser } from '../../modules/profile/libs/api';

const MainNavigation = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (session) {
      getOwnUser(session.accessToken).then(user => {
        if (typeof user !== 'string') {
          setUser(user);
        }
      });
    }
  }, [session]);

  const logoutHandler = async () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <header className={styles.header}>
      <Link href='/'>
        <a>
          <div>Basic Login</div>
        </a>
      </Link>
      <div className={styles.navigation}>
        <nav>
          <ul>
            <li>
              {session ? (
                <button onClick={logoutHandler}>Logout</button>
              ) : (
                <Link href='/sign-in'>Sign In</Link>
              )}
            </li>
          </ul>
        </nav>
        <Link href='/profile'>
          <div className={styles.avatar}>
            {user && <Image src={user?.image ?? ''} layout='fill' />}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default MainNavigation;
