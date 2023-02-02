import type { GetServerSideProps, NextPage } from 'next';
import styles from '../styles/Profile.module.scss';
import Head from 'next/head';
import { getOwnUser } from '../modules/profile/libs/api';
import { User } from '../models/user';
import { getSession } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';

type ProfilePageProps = {
  user: User;
};

const ProfilePage: NextPage<ProfilePageProps> = ({ user }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Profile</title>
        <meta name='description' content='User profile' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styles.main}>
        <div className={styles.email}>
          <div>Email:</div>
          <div>{user?.email}</div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let session = await unstable_getServerSession(req, res, authOptions);

  // redirect to sign in page if no session is found
  if (!session) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  const user = await getOwnUser(session.accessToken);
  if (typeof user === 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
};

export default ProfilePage;
