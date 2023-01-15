import { GetServerSideProps, NextPage } from 'next';
import { getSession, signIn } from 'next-auth/react';

import styles from '../styles/SignIn.module.scss';

const SignIn: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <button onClick={() => signIn('google')}>Sign In with Google</button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  let session = await getSession(ctx);

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
