import React, { useState, useEffect, useRef, useReducer } from "react";
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import yellow from "@material-ui/core/colors/yellow";
import grey from "@material-ui/core/colors/grey";
import Box from "@material-ui/core/Box";
import Timer from "./Timer";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const ButtonTest = ({ color, onClick, symbolValue }) => {
  return (
    <Button
      onClick={onClick.bind(null)}
      variant="contained"
      color={color}
      width="20%"
    >
      {symbolValue}
    </Button>
  );
};

const GridRow = index => {
  return (
    <React.Fragment>
      <Grid item>
        <ButtonTest buttonColor="primary" />
      </Grid>
      <Grid item>
        <ButtonTest buttonColor="secondary" />
      </Grid>
    </React.Fragment>
  );
};

const GridTest = () => {
  const [isVisible, setIsVisible] = useState("hidden");
  const move = 0;
  const no = 1;
  const player = 2;
  const win = 3;
  const objective = 4;
  const dark = 6;
  const light = 5;
  const switchPhys = 7;
  const transport = 8;
  const [isDark, setIsDark] = useState(false);
  const left = -1;
  const right = 1;
  const [currentDirection, setCurrentDirection] = useState(right);
  const [transportIndexStart, setTransportIndexStart] = useState(13);
  const nameRef = useRef(null);

  //timer
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const LIMIT_TO_WAIT = 5;

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    //changer position bloc après intervalle temps
    if (seconds >= LIMIT_TO_WAIT) {
      if (
        canBlockMoveRight(transportIndexStart, 14, right) &&
        currentDirection === right &&
        symbolState[transportIndexStart + right] !== player
      ) {
        changeTransportState(transportIndexStart, transport, right);
      } else if (
        canBlockMoveLeft(transportIndexStart, 12, left) &&
        currentDirection === left &&
        symbolState[transportIndexStart + left] !== player
      ) {
        changeTransportState(transportIndexStart, transport, left);
      }
      if (
        canBlockMoveRight(transportIndexStart + right, 14, right) === false &&
        currentDirection === right
      ) {
        setCurrentDirection(left);
      } else if (
        canBlockMoveLeft(transportIndexStart + left, 12, left) === false &&
        currentDirection === left
      ) {
        setCurrentDirection(right);
      }
      setSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const canBlockMoveRight = (index, maxIndex, direction) => {
    return index + direction <= maxIndex;
  };

  const canBlockMoveLeft = (index, minIndex, direction) => {
    return index + direction >= minIndex;
  };

  //fin timer

  //code pour ajouter des couleurs. Material-ui n'est pas encore parfais pour cela
  const themeColor = createMuiTheme();
  themeColor.palette.success = themeColor.palette.augmentColor({
    main: yellow[500]
  });
  themeColor.palette.goal = themeColor.palette.augmentColor({
    main: grey[900]
  });

  const isSuccess = style => props =>
    props.color === "success" && props.variant === "contained" ? style : {};

  const isGoal = style => props =>
    props.color === "goal" && props.variant === "contained" ? style : {};

  themeColor.overrides = {
    MuiButton: {
      root: {
        color: isSuccess(themeColor.palette.success.contrastText),
        color: isGoal(themeColor.palette.goal.contrastText),

        backgroundColor: isSuccess(themeColor.palette.success.main),
        //backgroundColor: isGoal(themeColor.palette.goal.main),
        "&:hover": {
          backgroundColor: isSuccess(themeColor.palette.success.dark)
          //backgroundColor: isGoal(themeColor.palette.goal.dark)
        }
      }
    }
  };

  const verifyIfIsCloseToIndex = (index, stateIdx, val) => {
    return (
      index === stateIdx &&
      val !== objective &&
      val !== light &&
      val !== dark &&
      val !== switchPhys &&
      val !== transport
    );
  };

  const testReducerFunction = (state, action) => {
    switch (action.type) {
      case "PLAYER": {
        console.log(state.indexPlayer);
        return {
          ...state,
          symbolStateR: state.symbolStateR.map((val, index) =>
            index === state.indexPlayer
              ? val === objective
                ? win
                : player
              : verifyIfIsCloseToIndex(state.indexPlayer + 1, index, val)
              ? move
              : verifyIfIsCloseToIndex(state.indexPlayer - 1, index, val)
              ? move
              : verifyIfIsCloseToIndex(state.indexPlayer - 2, index, val)
              ? no
              : verifyIfIsCloseToIndex(state.indexPlayer + 2, index, val)
              ? no
              : val
          )
        };
      }
      case "SWITCH": {
        const tempIsDark = state.isDarkR ? false : true;
        return {
          isDarkR: tempIsDark,
          symbolStateR: state.symbolStateR,
          indexPlayer: state.indexPlayer
        };
      }

      case "ADVANCE": {
        const tempAdvance = state.indexPlayer + 1;
        return {
          isDarkR: state.isDarkR,
          symbolStateR: state.symbolStateR,
          indexPlayer: tempAdvance
        };
      }

      default: {
        return state;
      }
    }
  };

  const callReducerFunction = type => {
    console.log(
      testReducer.symbolStateR.map((val, index) => ({
        val
      }))
    );
    if (type === "player") {
      dispatch({ type: "PLAYER" });
    } else if (type == "advance") {
      dispatch({ type: "ADVANCE" });
      dispatch({ type: "PLAYER" });
    } else if (type === "switch") {
      dispatch({ type: "SWITCH" });
    }
  };

  //fin test
  const [symbolState, setSymbolState] = useState([
    no,
    move,
    player,
    move,
    no,
    no,
    light,
    no,
    no,
    switchPhys,
    no,
    dark,
    no,
    transport,
    no,
    objective
  ]);

  const [testReducer, dispatch] = useReducer(testReducerFunction, {
    isDarkR: true,
    symbolStateR: symbolState,
    indexPlayer: 5
  });
  const { isDarkR, symbolStateR } = testReducer;

  const allColors = [
    "primary",
    "secondary",
    "default",
    "success",
    "goal",
    "default",
    "goal",
    "primary",
    "primary"
  ];
  const allSymbols = [
    "Move",
    "No",
    "Player",
    "Win",
    "Objective",
    "Light",
    "Dark",
    "Switch",
    "Transport"
  ];

  const classes = useStyles();

  useEffect(() => {
    if (isSuccessHere() === true) {
      setIsVisible("visible");
    }
  }, [symbolState]);

  const isSuccessHere = () => {
    let success = false;
    symbolState.map((val, index) => {
      if (val === win) {
        success = true;
      }
    });
    return success;
  };

  const useApi = () => {};

  //revoir nom
  const changeAState = (index, symbol, type) => {
    if (type === "player") {
      changeButtonState(index, symbol);
    } else {
      changeOtherState(index, symbol);
    }
    setTransportIndexStart(index);
  };

  const changeOtherState = (index, symbol) => {
    setSymbolState(
      symbolState.map((val, stateIdx) => (index === stateIdx ? symbol : val))
    );
  };

  const changeTransportState = (index, symbol, direction) => {
    setSymbolState(
      symbolState.map((val, stateIdx) =>
        index + direction === stateIdx ? symbol : index === stateIdx ? no : val
      )
    );
    setTransportIndexStart(index + direction);
  };

  //fonctionne uniquement pour le joueur
  const changeButtonState = (index, symbol) => {
    setSymbolState(
      symbolState.map((val, stateIdx) =>
        index === stateIdx
          ? val === objective
            ? win
            : symbol
          : //+1 et -1 pour remplacer les player par move
          verifyIfIsCloseToIndex(index + 1, stateIdx, val)
          ? move
          : verifyIfIsCloseToIndex(index - 1, stateIdx, val)
          ? move
          : //+2 et -2 sont pour remplacer les moves par des no
          verifyIfIsCloseToIndex(index + 2, stateIdx, val)
          ? no
          : verifyIfIsCloseToIndex(index - 2, stateIdx, val)
          ? no
          : val
      )
    );
  };

  //nom à revoir
  /*const verifyIfIsCloseToIndex = (index, stateIdx, val) => {
    return (
      index === stateIdx &&
      val !== objective &&
      val !== light &&
      val !== dark &&
      val !== switchPhys &&
      val !== transport
    );
  };*/

  const isSymbolEqualToSymbol = (index, symbol) => {
    return symbolState[index] === symbol;
  };

  const isASymbolValid = index => {
    return (
      isSymbolEqualToSymbol(index, move) ||
      isSymbolEqualToSymbol(index, objective) ||
      isSymbolEqualToSymbol(index, light) ||
      isSymbolEqualToSymbol(index, dark) ||
      isSymbolEqualToSymbol(index, switchPhys) ||
      isSymbolEqualToSymbol(index, transport)
    );
  };

  const changeSwitchState = () => {
    if (isDark === true) {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
  };

  const verifyCanMove = index => {
    if (
      isASymbolValid(index) &&
      (symbolState[index - 1] === player || symbolState[index + 1] === player)
    ) {
      if (symbolState[index] === switchPhys) {
        changeSwitchState();
      }
      //on garde comme condition mais on simplifie
      if (
        (isDark === true && symbolState[index] === light) ||
        (isDark === false && symbolState[index] === dark)
      ) {
      } else {
        changeButtonState(index, player);
      }
    }
  };

  const testRef = () => {
    console.log(nameRef.current.value);
  };

  return (
    <MuiThemeProvider theme={themeColor}>
      <div className={classes.root}>
        <Box>{isDark ? "Dark" : "Light"}</Box>
        <div className="time">{seconds}s</div>
        <div className="row">
          <button
            className={`button button-primary button-primary-${
              isActive ? "active" : "inactive"
            }`}
            onClick={toggle}
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button className="button" onClick={reset}>
            Reset
          </button>
        </div>
        <input ref={nameRef} placeholder="name" />
        <button onClick={testRef}>Focus</button>
        <button onClick={callReducerFunction.bind(null, "player")}>
          test reducer player
        </button>
        <button onClick={callReducerFunction.bind(null, "advance")}>
          Avancer
        </button>
        <button onClick={callReducerFunction.bind(null, "switch")}>
          test reducer switch
        </button>
        <Box>{isDarkR ? "Dark" : "Light"}</Box>
        <Grid container spacing={3}>
          <Grid container item xs={3}>
            {symbolState.map((value, index) => (
              <ButtonTest
                key={index}
                onClick={verifyCanMove.bind(null, index)}
                color={allColors[value]}
                symbolValue={allSymbols[value]}
              />
            ))}
          </Grid>
        </Grid>
        <Box visibility={isVisible}>Win</Box>
      </div>
    </MuiThemeProvider>
  );
};
export default GridTest;
