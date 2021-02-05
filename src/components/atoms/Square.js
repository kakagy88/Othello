import React from "react";

import "./Square.scss";

const Square = (num, value, func) => {
  return (
    <button className="square" onClick={() => func(num)} key={num}>
      {value === null ? (
        <span>{null}</span>
      ) : value === "●" ? (
        <div className="white animated bounceIn">{"●"}</div>
      ) : value === "○" ? (
        <div className="black animated fadeIn">{"●"}</div>
      ) : (
        <div className="available-place animated rotateIn">{"□"}</div>
      )}
    </button>
  );
};

export default Square;
