import { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const calculateWinner = (squares) => {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    // if (a === '-' || b === '-' || c === '-') return null;
    if (
      squares[a] !== '-' &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return null;
};

const Square = ({ value, onClick }) => {
  return (
    <button className="box" onClick={onClick}>
      {value}
    </button>
  );
};

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};

const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [squares, setSquares] = useState(Array(9).fill('-'));
  const [winner, setWinner] = useState(null);

  const handleSquareClick = (index) => {
    if (winner || squares[index] !== '-') {
      return;
    }

    const updatedSquares = [...squares];
    updatedSquares[index] = currentPlayer;
    setSquares(updatedSquares);

    const updatedWinner = calculateWinner(updatedSquares);
    setWinner(updatedWinner);

    setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
  };

  const renderSquare = (index) => {
    return (
      <Square value={squares[index]} onClick={() => handleSquareClick(index)} />
    );
  };

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + currentPlayer;
  }

  return (
    <div id="game">
      <button id='headerBtn' onClick={() => window.location.reload(false)}>Tic Tac Toe</button>
      <div id="status">{status}</div>
      <div id="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
};

export default App;
