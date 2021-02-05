import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initBoard } from "../../actions";

import "./NewGameButton.scss";

const NewGameButton = () => {
  const dispatch = useDispatch();
  return (
    <Link to="/new">
      <button
        className="title__new-game-button"
        onClick={() => dispatch(initBoard())}
      >
        NewGame
      </button>
    </Link>
  );
};
export default NewGameButton;
