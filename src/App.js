import React, { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to start";
    }
    return (
      <li key={move}>
        <button className="jump-button" onClick = {() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} currentMove={currentMove} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({xIsNext, squares, onPlay, currentMove}) {
  let nextSquares;
  function handleClick(i) {
    if(squares[i] || calculateWinner(squares)) {
      return;
    }
    nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  let winningSquares = Array(3).fill(null);
  if (winner) {
    status = "Winner: " + winner;
    winningSquares = getWinningSquares(squares);
    console.log(winningSquares);
  } else if (currentMove === 9) {
    status = "Draw";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

   function isWinningSquare(index) {
    if (winningSquares.includes(index)) {
      return "true";
    }
    return "false";
   }

  //   const lines = [
  //     [0,1,2],
  //     [3,4,5],
  //     [6,7,8],
  //     [0,3,6],
  //     [1,4,7],
  //     [2,5,8],
  //     [0,4,8],
  //     [2,4,6]
  //   ];
  //   for (let i = 0; i < lines.length; i++) {
  //     const [a,b,c] = lines[i];
  //     if (nextSquares[a] && nextSquares[a] === nextSquares[b] && nextSquares[a] === nextSquares[c]) {
  //       const winningSquares = [a,b,c];
  //       if (winningSquares.includes(index)) {
  //         return "true";
  //       }
  //     }
  //   }
  //   return "false";
  // }

  //winningSquares = getWinningSquares(squares);

  // function getWinningSquares() {
  //   const lines = [
  //         [0,1,2],
  //         [3,4,5],
  //         [6,7,8],
  //         [0,3,6],
  //         [1,4,7],
  //         [2,5,8],
  //         [0,4,8],
  //         [2,4,6]
  //       ];
  //       for (let i = 0; i < lines.length; i++) {
  //         const [a,b,c] = lines[i];
  //         if (nextSquares[a] && nextSquares[a] === nextSquares[b] && nextSquares[a] === nextSquares[c]) {
  //           return [a,b,c];
  //         }
  //       }
  // }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} checkWinningSquare={isWinningSquare(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} checkWinningSquare={isWinningSquare(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} checkWinningSquare={isWinningSquare(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} checkWinningSquare={isWinningSquare(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} checkWinningSquare={isWinningSquare(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} checkWinningSquare={isWinningSquare(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} checkWinningSquare={isWinningSquare(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} checkWinningSquare={isWinningSquare(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} checkWinningSquare={isWinningSquare(8)}/>
      </div>
    </div>
  );
}

function Square({value, onSquareClick, checkWinningSquare}) {
  return (
    <button className="square" onClick={onSquareClick} isWinningSquare={checkWinningSquare}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getWinningSquares(squares) {
  const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return [a,b,c];
        }
      }
}
