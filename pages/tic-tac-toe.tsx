import type { NextPage } from 'next';
import Head from 'next/head';
import TicTacToe from '../components/tic-tac-toe';

const TicTacToePage: NextPage = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-full p-8'>
      <Head>
        <title>Tic Tac Toe</title>
        <meta
          name='description'
          content='Tic tac toe game of basic login app'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1 className='text-5xl mb-5'>Tic Tac Toe Game</h1>

      <TicTacToe />
    </div>
  );
};

export default TicTacToePage;
