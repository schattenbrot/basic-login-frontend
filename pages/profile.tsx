import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { getOwnUser } from '../modules/profile/libs/api';
import { User } from '../models/user';
import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

type ProfilePageProps = {
  user: User;
};

const ProfilePage: NextPage<ProfilePageProps> = ({ user }) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Head>
        <title>Profile</title>
        <meta name='description' content='User profile' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex flex-col gap-4 w-[40rem] p-8'>
        <div className='flex justify-between'>
          <div>Email:</div>
          <div>{user?.email}</div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let session = await getServerSession(req, res, authOptions);

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
