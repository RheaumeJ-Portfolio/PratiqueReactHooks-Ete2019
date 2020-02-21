import React, { useState, useEffect } from "react";

const Game = () => {
  const [turnState, setTurnState] = useState("o");
  const [squaresState, setSquareState] = useState([
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty"
  ]);
  const [stringTest, setStringTest] = useState("test");
  const [winningState, setWinningState] = useState(false);

  useEffect(() => {
    if (!calculateWinningMoves()) {
      changeTurn();
    }
  }, [squaresState]);

  useEffect(() => {
    if (winningState) {
      setStringTest(`${turnState}`);
    }
  }, [winningState]);

  const calculateWinningMoves = () => {
    if (calculateWinningMove1() || calculateWinningMove2()) {
      setWinningState(true);
      return true;
    }
    return false;
  };

  const calculateWinningMove1 = () => {
    let winningMove = false;
    {
      Array(3)
        .fill(1)
        .map((item, i) => {
          let indexes = [i * 3, i * 3 + 1, i * 3 + 2];
          if (areSquaresOccupiedByRightPlayer(indexes)) {
            winningMove = true;
          }
          indexes = [i + 0, i + 3, i + 6];
          if (areSquaresOccupiedByRightPlayer(indexes)) {
            winningMove = true;
          }
        });
    }
    return winningMove;
  };

  const calculateWinningMove2 = () => {
    let winningMove = false;
    {
      Array(2)
        .fill(1)
        .map((item, i) => {
          const indexes = [i * 2 + 0, 4, 8 - i * 2];
          if (areSquaresOccupiedByRightPlayer(indexes)) {
            winningMove = true;
          }
        });
    }

    return winningMove;
  };

  const areSquaresOccupiedByRightPlayer = items => {
    return (
      squaresState[items[0]] === turnState &&
      squaresState[items[1]] === turnState &&
      squaresState[items[2]] === turnState
    );
  };

  const verifyWinner = index => {
    setSquareState(
      squaresState.map((val, stateIdx) =>
        index === stateIdx ? turnState : val
      )
    );
  };

  const changeTurn = () => {
    turnState === "x" ? setTurnState("o") : setTurnState("x");
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: "auto auto auto"
        }}
      >
        {squaresState.map((value, index) => (
          <Square
            key={index}
            onClick={verifyWinner.bind(null, index)}
            turnState={value}
          />
        ))}
      </div>
      <p>Tour : {turnState}</p>
      <p>Gagnant : {stringTest}</p>
    </div>
  );
};

const Square = ({ turnState, onClick }) => {
  return (
    <div>
      <button onClick={onClick.bind(null)} disabled={turnState !== "empty"}>
        {turnState === "x" ? "X" : turnState === "o" ? "O" : "Vide"}
      </button>
    </div>
  );
};

const App = () => {
  const [gameId, setGameId] = useState(0);

  return (
    <div>
      <h1>Test</h1>
      <Game />
    </div>
  );
};

const ExemplePersonnel = () => {
  return <App />;
};

export default ExemplePersonnel;
