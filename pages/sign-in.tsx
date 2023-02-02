import { GetServerSideProps, NextPage } from 'next';
import { getSession, signIn } from 'next-auth/react';

import styles from '../styles/SignIn.module.scss';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

const SignIn: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <button onClick={() => signIn('google')}>Sign In with Google</button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default SignIn;
