import React, { memo } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from "./pages/Main";

import "./app.scss";

export const App = memo((props) => (
  <Provider store={props.store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="*" component={Main} />
      </Switch>
    </BrowserRouter>
  </Provider>
));
