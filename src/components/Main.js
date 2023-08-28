import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

const Main = (props) => {
  const { isLoggedIn, handleLoggedIn } = props;
  const showLogin = () => {
    return isLoggedIn ? (
      <Redirect to="/home"></Redirect>
    ) : (
      <Login handleLoggedIn={handleLoggedIn}></Login>
    );
  };
  const showHome = () => {
    return isLoggedIn ? <Home /> : <Redirect to="/login" />;
  };
  return (
    <div className="main">
      <Switch>
        <Route path="/" exact render={showLogin}></Route>
        <Route path="/login" render={showLogin} />
        <Route path="/register" component={Register} />
        <Route path="/home" render={showHome} />
      </Switch>
    </div>
  );
};

export default Main;
