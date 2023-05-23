import type { NextPage } from 'next';
import Head from 'next/head';
import { useGetServerStatus } from '../modules/home/hooks/useRequest';

const Home: NextPage = () => {
  const { data, error } = useGetServerStatus('/');

  const home = () => {
    if (!data) {
      return <h1>Loading...</h1>;
    }
    if (error) {
      return <h1>{error}</h1>;
    }
    return <h1>{data!.status}</h1>;
  };

  return (
    <div className='grid place-items-center'>
      <Head>
        <title>Basic Login</title>
        <meta name='description' content='Home page of the basic login app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className=''>{home()}</div>
    </div>
  );
};

export default Home;
