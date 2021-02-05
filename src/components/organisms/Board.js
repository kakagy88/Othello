import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePlayerBoard, updateNpcBoard, getBoard } from "../../actions";

import Square from "../atoms/Square";

import "./Board.scss";

const Board = () => {
  const dispatch = useDispatch();
  dispatch(getBoard());
  const boardSelector = (state) => state.board[0].board;
  const board = useSelector(boardSelector);

  function handleClick(num) {
    dispatch(updatePlayerBoard(num));
    const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
    (async () => {
      await sleep(1000);
      dispatch(updateNpcBoard());
    })();
  }

  const tableSquare = [...Array(8).keys()].map((row) => (
    <div className="game__board-row" key={row}>
      {[...Array(8).keys()].map((col) =>
        Square(col + row * 8, board[col + row * 8], handleClick)
      )}
    </div>
  ));
  return <div className="game__board">{tableSquare}</div>;
};

export default Board;
