export const initBoard = () => ({
  type: "INIT_BOARD",
});

export const getBoard = () => ({
  type: "GET_BOARD",
});

export const updateNpcBoard = () => ({
  type: "UPDATE_NPC_BOARD",
});

export const updatePlayerBoard = (num) => ({
  type: "UPDATE_PLAYER_BOARD",
  num,
});
