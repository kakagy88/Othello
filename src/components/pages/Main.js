import React, { PureComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Game from "./Game.js";
import Title from "./Title.js";

import "./Main.scss";

export default class Main extends PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <Title />
          </Route>
          <Route path="/new">
            <Game />
          </Route>
          <Route path="/continue">
            <Game />
          </Route>
        </Switch>
      </Router>
    );
  }
}
