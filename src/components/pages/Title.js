import React from "react";

import Header from "../atoms/Header";
import NewGameButton from "../atoms/NewGameButton";
import ContinueButton from "../atoms/ContinueButton";

import "./Title.scss";

const Title = () => {
  return (
    <div className="animated fadeIn">
      <div className="title">
        <Header />
        <NewGameButton />
        <ContinueButton />
      </div>
    </div>
  );
};

export default Title;
