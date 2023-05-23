import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from './mainNavigation.module.scss';
import Image from 'next/image';
import { User } from '../../models/user';
import { getOwnUser } from '../../modules/profile/libs/api';
import { useRouter } from 'next/router';

const MainNavigation = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();
  const router = useRouter();

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
      <div className={styles.navigation}>
        <Link href='/' passHref>
          <a className={router.pathname == '/' ? styles.activeLink : ''}>
            <div>Basic Login</div>
          </a>
        </Link>
        <Link href='/waifus' passHref>
          <a className={router.pathname == '/waifus' ? styles.activeLink : ''}>
            <div>Waifus</div>
          </a>
        </Link>
        <Link href='/tic-tac-toe' passHref>
          <a
            className={
              router.pathname == '/tic-tac-toe' ? styles.activeLink : ''
            }
          >
            <div>TicTacToe</div>
          </a>
        </Link>
      </div>
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
            {user && (
              <Image src={user?.image ?? ''} alt='user avatar' layout='fill' />
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default MainNavigation;
