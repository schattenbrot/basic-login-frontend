import type { NextPage } from 'next';
import Head from 'next/head';
import { useGetServerStatus } from '../modules/home/hooks/useRequest';
import styles from '../styles/Home.module.css';

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
    <div className={styles.container}>
      <Head>
        <title>Basic Login</title>
        <meta name='description' content='Home page of the basic login app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styles.main}>{home()}</div>
    </div>
  );
};

export default Home;
