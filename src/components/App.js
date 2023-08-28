import logo from "../assets/logo.svg";
import TopBar from "./TopBar";
import Main from "./Main";
import { useState } from "react";
import { config } from "../constants.js";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(
    !!localStorage.getItem(config.TOKEN_KEY)
  );

  const logout = () => {
    console.log("log out");
    localStorage.removeItem(config.TOKEN_KEY);
    setLoggedIn(false);
  };

  const loggedIn = (token) => {
    if (token) {
      localStorage.setItem(config.TOKEN_KEY, token);
      setLoggedIn(true);
    }
  };

  return (
    <div className="App">
      <TopBar isLoggedIn={isLoggedIn} handleLogout={logout} />
      <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} />
    </div>
  );
};

export default App;
