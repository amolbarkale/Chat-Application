import "./App.css";
import Home from "./Pages/home/Home";
import Profile from "../src/Pages/Profile/Profile";
import Login from "../src/Pages/Login/Login";
import Reg from "../src/Pages/Register/Reg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { DMM } from "./Pages/DM/Dm";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Reg />}
        </Route>
        <Route path="/dm">
          <DMM />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">{user ? <Redirect to="/" /> : <Reg />}</Route>

        <Route exact path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
