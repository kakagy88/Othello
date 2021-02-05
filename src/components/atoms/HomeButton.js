import React from "react";
import { Link } from "react-router-dom";

import "./HomeButton.scss";

const HomeButton = () => {
  return (
    <Link to="/">
      <button className="game__home-button">Home</button>
    </Link>
  );
};
export default HomeButton;
