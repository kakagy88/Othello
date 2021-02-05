import React from "react";
import { Link } from "react-router-dom";

import "./ContinueButton.scss";

const ContinueButton = () => (
  <Link to="/continue">
    <button className="title__continue-button">Continue</button>
  </Link>
);

export default ContinueButton;
