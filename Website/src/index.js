import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Map from "./components/Map";
import Home from "./components/Home";
import { AuthProvider, AuthConsumer } from "./AuthContext";
import Register from "./components/Register";
import "./components/tempo.css";
import Donations from "./components/Donations";
import Requests from "./components/Requests";

const App = () => (
  <div style={{ height: "100%" }}>
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/Map" component={Map} />
          <ProtectedRoute exact path="/Home" component={Home} />
          <ProtectedRoute exact path="/Donations" component={Donations} />
          <ProtectedRoute exact path="/Requests" component={Requests} />
        </Switch>
      </Router>
    </AuthProvider>
  </div>
);

document.getElementById("root").style.height = "100%";
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
