import React from "react";
import { useSelector } from "react-redux";

import "./Info.scss";

const Info = () => {
  const statusSelector = (state) => state.board[0].status;
  const status = useSelector(statusSelector);
  return (
    <div className="game__info">
      <span className="white">{"●"}</span>
      {status}
      <span className="black">{"●"}</span>
    </div>
  );
};

export default Info;
