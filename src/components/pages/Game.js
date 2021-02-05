import React from "react";

import Board from "../organisms/Board";
import Info from "../molecules/Info";
import Footer from "../molecules/Footer";

import "./Game.scss";

const Game = () => {
  return (
    <div className="animated fadeIn">
      <div className="game">
        <Board />
        <Info />
        <Footer />
      </div>
    </div>
  );
};

export default Game;
