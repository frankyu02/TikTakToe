import { useEffect, useState } from "react";
import "./App.css";
import Tile from "./Components/Tile/Tile";

function App() {
  const [board, setBoard] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const [turn, setTurn] = useState("O");
  const [win, setWin] = useState(0);
  const [loading, setLoading] = useState(false);
  const turnMap = {
    O: "X",
    X: "O",
  };
  const checkBoardWin = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // horizontal
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // vertical
      [0, 4, 8],
      [2, 4, 6], // diagonal
    ];

    // Check if any winning combination is present
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] !== -1 && board[a] === board[b] && board[a] === board[c]) {
        return 1;
      }
    }

    // Check if the board is full and the game is a tie
    if (board.indexOf(-1) === -1) {
      return -1;
    }

    // If no winning combination and the board is not full, return -1 to indicate the game continues
    return 0;
  };
  const changeBoard = (idx, val) => {
    setLoading(true);
    const newBoard = [...board];
    newBoard[idx] = val;
    setBoard(newBoard);
  };
  useEffect(() => {
    setWin(checkBoardWin());
    console.log(win);
    if (!win) {
      setTurn(turnMap[turn]);
    }
    setLoading(false);
  }, [board]);
  const resetBoard = () => {
    setBoard([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
    setWin(0);
    setTurn("X");
    setLoading(false);
  };
  return (
    <div className="Wrapper">
      <h1>It's {turn}'s turn</h1>
      <section className="container">
        {board?.map((piece, idx) => {
          return (
            <Tile
              key={idx}
              value={piece}
              changeBoard={changeBoard}
              piece={turn}
              index={idx}
              win={win}
              loading={loading}
            />
          );
        })}
      </section>
      <button onClick={resetBoard}>reset</button>
      {win === 1 && <h2>{turnMap[turn]} wins!</h2>}
      {win === -1 && <h2>Draw!</h2>}
    </div>
  );
}

export default App;
