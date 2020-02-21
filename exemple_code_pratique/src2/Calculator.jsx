import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./Calculator.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Calculator = () => {
  const [calculatorText, setCalculatorText] = useState("");
  const [areOperatorDisabled, setAreOperatorDisabled] = useState(false);

  const addNumber = value => setCalculatorText(calculatorText + value);

  const reset = () => setCalculatorText("");

  const calculate = () => {
    try {
      setCalculatorText(eval.call(null, calculatorText) || "");
    } catch {
      setCalculatorText("erreur");
    }
  };

  const backspace = () => {
    try {
      setCalculatorText(calculatorText.slice(0, -1));
    } catch {
      reset();
    }
  };

  return (
    <div className="calculator">
      <label>{calculatorText}</label>
      <div>
        <ButtonGroup className="buttonGroup">
          <Button
            className="button"
            variant="danger"
            onClick={addNumber.bind(this, "(")}
            disabled={areOperatorDisabled}
          >
            (
          </Button>
          <Button
            className="button"
            variant="danger"
            onClick={backspace.bind(this)}
          >
            CE
          </Button>
          <Button
            className="button"
            variant="danger"
            onClick={addNumber.bind(this, ")")}
            disabled={areOperatorDisabled}
          >
            )
          </Button>
          <Button
            className="button"
            variant="danger"
            onClick={reset.bind(this)}
          >
            C
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup className="buttonGroup">
          <Button
            className="button"
            variant="light"
            onClick={addNumber.bind(this, 1)}
          >
            1
          </Button>
          <Button
            className="button"
            variant="light"
            onClick={addNumber.bind(this, 2)}
          >
            2
          </Button>
          <Button
            className="button"
            variant="light"
            onClick={addNumber.bind(this, 3)}
          >
            3
          </Button>
          <Button
            className="button"
            variant="danger"
            onClick={addNumber.bind(this, "+")}
            disabled={areOperatorDisabled}
          >
            +
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup className="buttonGroup">
          <Button
            className="button"
            variant="light"
            onClick={addNumber.bind(this, 4)}
          >
            4
          </Button>
          <Button
            className="button"
            variant="light"
            onClick={addNumber.bind(this, 5)}
          >
            5
          </Button>
          <Button
            className="button"
            variant="light"
            onClick={addNumber.bind(this, 6)}
          >
            6
          </Button>
          <Button
            className="button"
            variant="danger"
            onClick={addNumber.bind(this, "-")}
            disabled={areOperatorDisabled}
          >
            -
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup className="buttonGroup">
          <Button
            className="button"
            variant="light"
            onClick={addNumber.bind(this, 7)}
          >
            7
          </Button>
          <Button
            className="button"
            variant="light"
            onClick={addNumber.bind(this, 8)}
          >
            8
          </Button>
          <Button
            className="button"
            variant="light"
            onClick={addNumber.bind(this, 9)}
          >
            9
          </Button>
          <Button
            className="button"
            variant="danger"
            onClick={addNumber.bind(this, "*")}
            disabled={areOperatorDisabled}
          >
            *
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup className="buttonGroup">
          <Button
            className="button"
            variant="danger"
            onClick={addNumber.bind(this, ".")}
          >
            .
          </Button>
          <Button
            className="button"
            variant="light"
            onClick={addNumber.bind(this, 0)}
          >
            0
          </Button>
          <Button
            className="button"
            variant="danger"
            onClick={calculate.bind(this)}
          >
            =
          </Button>
          <Button
            className="button"
            variant="danger"
            onClick={addNumber.bind(this, "/")}
            disabled={areOperatorDisabled}
          >
            /
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Calculator;
