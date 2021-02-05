import React from "react";
import { useSelector } from "react-redux";

import NewGameButton from "../atoms/NewGameButton";
import HomeButton from "../atoms/HomeButton";

import "./Footer.scss";

const Footer = () => {
  const statusSelector = (state) => state.board[0].status;
  const status = useSelector(statusSelector);
  return (
    <div className="footer">
      {status === "Player Win" || status === "Npc Win" || status === "Draw" ? (
        <NewGameButton />
      ) : (
        <HomeButton />
      )}
    </div>
  );
};

export default Footer;
