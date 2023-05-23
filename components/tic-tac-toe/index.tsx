import { useEffect, useState } from 'react';
import Tile, { Player } from './Tile';

const TicTacToe = () => {
  const [board, setBoard] = useState<(Player | '')[]>(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | ''>('');
  const [winningFields, setWinningFields] = useState<number[]>([]);

  useEffect(() => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // check winning combination
    winningCombos.forEach(combo => {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningFields([a, b, c]);
      }
    });
  }, [board]);

  const handleSelectField = (pos: number) => {
    if (board[pos] !== '') return;
    let updatedBoard = [...board];
    updatedBoard[pos] = currentPlayer;
    setBoard(updatedBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const handleReset = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner('');
    setWinningFields([]);
  };

  return (
    <div>
      {!winner && (
        <h2 className='text-3xl text-center mb-3'>
          Current Player:{' '}
          <span
            className={currentPlayer === 'X' ? 'text-blue-400' : 'text-red-400'}
          >
            {currentPlayer}
          </span>
        </h2>
      )}
      {winner && (
        <>
          <h2 className='text-3xl text-center mb-3'>
            Winner: <span className='text-pink-300'>{winner ?? 'None'}</span>
          </h2>

          <div className='grid place-items-center'>
            <button
              type='reset'
              className='text-xl text-center text-red-400 mb-3'
              onClick={handleReset}
            >
              Restart
            </button>
          </div>
        </>
      )}

      <div className='grid grid-cols-3 grid-rows-3'>
        {board.map((cell, index) => (
          <Tile
            key={index}
            value={cell}
            index={index}
            isWinner={winningFields.includes(index)}
            gameWon={winningFields.length !== 0}
            onClick={handleSelectField}
          />
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
