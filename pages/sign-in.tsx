import { GetServerSideProps, NextPage } from 'next';
import { signIn } from 'next-auth/react';

import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

const SignIn: NextPage = () => {
  return (
    <div className='grid place-items-center'>
      <div className='w-[40rem] p-8 flex flex-col justify-center items-center gap-4'>
        <button
          onClick={() => signIn('google')}
          className='text-lg p-4 border-2 rounded-2xl shadow-background-light shadow-lg hover:scale-105 active:scale-100 active:shadow-sm'
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let session = await getServerSession(req, res, authOptions);

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
