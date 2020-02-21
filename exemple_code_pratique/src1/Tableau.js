import React, { useState, useEffect } from "react";

/*function LogRandom() {
  console.log(Math.random());
}

function Button(props) {
  const handleClick = () => props.onClickFunction(props.increment);
  return <button onClick={handleClick}>+{props.increment}</button>;
}*/

function App() {
  /*const [count, setCount] = useState(0);
  const incrementCounter = incrementValue => setCount(count + incrementValue);
  return (
    <div>
      <Button onClickFunction={incrementCounter} increment={1} />
      <Button onClickFunction={incrementCounter} increment={5} />
      <Button onClickFunction={incrementCounter} increment={10} />
      <Button onClickFunction={incrementCounter} increment={100} />
      <Display message={count} />
      <pre>${new Date().toLocaleTimeString()}</pre>
    </div>
  );*/
}

/*function Display(props) {
  return <div>{props.message}</div>;
}*/

function Tableau() {
  /*const [count, setCount] = useState(0);
  const [age, setAge] = useState(0);
  const handleClick = () => setCount(count + 1);

  useEffect(() => {
    document.title = `clicked ${count} times`;
  });

  return (
    <table>
      <tbody>
        <tr>
          <td>You clicked {count} times</td>
          <button onClick={handleClick}>test</button>
        </tr>
      </tbody>
    </table>
  );*/
  return <App />;
}

//ne fonctionne pas

/*function Tableau(props) {
  const [isOnline, setIsOnline] = useState(null);
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  useEffect(() => {
    ChatAPI.subscribeTableau(props.friend.id, handleStatusChange);

    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline == null) {
    return "Loading ...";
  }
  return isOnline ? "Online" : "Offline";
}*/

export default Tableau;
