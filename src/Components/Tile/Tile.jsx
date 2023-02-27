import { useEffect } from "react";
import { RxCross1, RxCircle } from "react-icons/rx";
export default function Tile({
  value,
  changeBoard,
  piece,
  index,
  win,
  loading,
}) {
  const pieceToNum = {
    O: 1,
    X: 0,
  };
  if (value === 0) {
    return (
      <div className="cell">
        <span>
          <RxCross1 />
        </span>
      </div>
    );
  } else if (value === 1) {
    return (
      <div className="cell">
        <span>
          <RxCircle />
        </span>
      </div>
    );
  }
  return (
    <button
      className="cell hoverable"
      onClick={() => {
        changeBoard(index, pieceToNum[piece]);
      }}
      disabled={win || loading}
    />
  );
}
