export type Player = 'X' | 'O';

export type TileProps = {
  value: Player | '';
  index: number;
  isWinner: boolean;
  gameWon: boolean;
  onClick: (field: number) => void;
};

const Tile = (props: TileProps) => {
  const { value, index, isWinner, gameWon, onClick: handleClick } = props;

  const getStyle = () => {
    let style = 'grid place-items-center w-20 h-20';
    if ((index + 1) % 3 !== 0) style += ' border-r-2';
    if (index < 6) style += ' border-b-2';
    if (isWinner) style += ' text-green-400';
    if (!gameWon && value === 'X') style += ' text-blue-400';
    if (!gameWon && value === 'O') style += ' text-red-400';
    return style;
  };

  return (
    <div className={getStyle()} onClick={() => handleClick(index)}>
      {value}
    </div>
  );
};

export default Tile;
