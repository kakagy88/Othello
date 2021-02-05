let _board;
let _isPlayerTurn;

const board = (state = [], action) => {
  switch (action.type) {
    case "INIT_BOARD":
      _board = generateInitialBoard();
      _isPlayerTurn = true;
      return updateBoard(state);

    case "GET_BOARD":
      if (_board) {
        return state;
      }
      const e = localStorage.getItem("board");
      if (!e) {
        _board = generateInitialBoard();
      } else {
        _board = JSON.parse(e);
      }
      _isPlayerTurn = true;
      return updateBoard(state);

    case "UPDATE_NPC_BOARD":
      if (_isPlayerTurn) {
        return state;
      }
      _isPlayerTurn = true;
      updateNpc(_board);
      return updateBoard(state);

    case "UPDATE_PLAYER_BOARD":
      if (!_isPlayerTurn) {
        return state;
      }
      const num = action.num;
      _board = _board.map((p) => (p === "p" ? (p = null) : p));
      let updatedBoard = _board;
      if (_board[num] === null) {
        const availablePlace = getAvailablePlace(true);
        if (availablePlace.length !== 0) {
          _board[num] = "●";
          updatedBoard = calcBoard(_board, num);
          _isPlayerTurn = false;
          if (JSON.stringify(_board) === JSON.stringify(updatedBoard)) {
            updatedBoard[num] = null;
            _isPlayerTurn = true;
            availablePlace.map((p) => (updatedBoard[p] = "p"));
          }
        }
      }
      _board = updatedBoard;
      return updateBoard(state);
    default:
      return state;
  }
};

export default board;

// Function

const generateInitialBoard = () => {
  const initBoard = Array(64).fill(null);
  initBoard[27] = "○";
  initBoard[28] = "●";
  initBoard[35] = "●";
  initBoard[36] = "○";
  return initBoard;
};

const updateBoard = (state) => {
  localStorage.setItem("board", JSON.stringify(_board));
  const updateEl = {
    board: _board,
    status: updateStatus(),
  };
  if (state.length === 0) {
    return [...state, updateEl];
  }
  return state.map((el) => (el !== updateEl ? updateEl : el));
};

const getAvailablePlace = (isPlayer) => {
  const place = Array(64).fill(null);

  _board.forEach((value, index) => {
    if (_board[index] == null) {
      _board[index] = isPlayer ? "●" : "○";
      place[index] = calcBoard(_board, index).filter(
        (v, i) => _board[i] !== v
      ).length;
      _board[index] = null;
    }
  });

  const availablePlace = place.reduce(
    (arr, val, i) => (val === Math.max.apply(null, place) && arr.push(i), arr),
    []
  );
  return availablePlace;
};

const updateStatus = () => {
  let results = {};
  for (const value of _board) {
    results[value] = results[value] > 0 ? results[value] + 1 : 1;
  }
  const playerResult = results["●"];
  const npcResult = results["○"];
  let status = playerResult + " - " + npcResult;
  if (_board.indexOf(null) < 0) {
    status =
      playerResult === 32
        ? "Draw"
        : playerResult > 32
        ? "Player Win"
        : "Npc Win";
  }
  return status;
};

const updateNpc = () => {
  const e = getAvailablePlace(false);
  const num = e[Math.floor(Math.random() * e.length)];
  _board[num] = "○";
  _board = calcBoard(_board, num);
};

const calcBoard = (squaresCalc, thisTime) => {
  let table = squaresCalc.slice();

  // left part
  for (let left = 1; left <= thisTime % 8; left++) {
    if (table[thisTime - left] === squaresCalc[thisTime]) {
      for (let i = 1; i < left; i++) {
        table[thisTime - i] = squaresCalc[thisTime];
      }
      break;
    } else if (table[thisTime - left] === null) {
      break;
    }
  }
  //  right part
  for (let right = 1; right <= 7 - (thisTime % 8); right++) {
    if (table[thisTime + right] === squaresCalc[thisTime]) {
      for (let i = 1; i < right; i++) {
        table[thisTime + i] = squaresCalc[thisTime];
      }
      break;
    } else if (table[thisTime + right] === null) {
      break;
    }
  }
  //  upper part
  for (let upper = 1; upper <= thisTime / 8; upper++) {
    if (table[thisTime - upper * 8] === squaresCalc[thisTime]) {
      for (let i = 1; i < upper; i++) {
        table[thisTime - i * 8] = squaresCalc[thisTime];
      }
      break;
    } else if (table[thisTime - upper * 8] === null) {
      break;
    }
  }
  //  downer part
  for (let downer = 1; downer <= 8 - thisTime / 8; downer++) {
    if (table[thisTime + downer * 8] === squaresCalc[thisTime]) {
      for (let i = 1; i < downer; i++) {
        table[thisTime + i * 8] = squaresCalc[thisTime];
      }
      break;
    } else if (table[thisTime + downer * 8] === null) {
      break;
    }
  }

  //  upper right part
  for (let upperR = 1; upperR <= 7 - (thisTime % 8); upperR++) {
    if (table[thisTime - upperR * 7] === squaresCalc[thisTime]) {
      for (let i = 1; i < upperR; i++) {
        table[thisTime - i * 7] = squaresCalc[thisTime];
      }
      break;
    } else if (table[thisTime - upperR * 7] === null) {
      break;
    }
  }

  //  downer right part
  for (let downerR = 1; downerR <= 7 - (thisTime % 8); downerR++) {
    if (table[thisTime + downerR * 9] === squaresCalc[thisTime]) {
      for (let i = 1; i < downerR; i++) {
        table[thisTime + i * 9] = squaresCalc[thisTime];
      }
      break;
    } else if (table[thisTime + downerR * 9] === null) {
      break;
    }
  }

  //  upper left part
  for (let upperL = 1; upperL <= thisTime % 8; upperL++) {
    if (table[thisTime - upperL * 9] === squaresCalc[thisTime]) {
      for (let i = 1; i < upperL; i++) {
        table[thisTime - i * 9] = squaresCalc[thisTime];
      }
      break;
    } else if (table[thisTime - upperL * 9] === null) {
      break;
    }
  }

  //  downer left part
  for (let downerL = 1; downerL <= thisTime % 8; downerL++) {
    if (table[thisTime + downerL * 7] === squaresCalc[thisTime]) {
      for (let i = 1; i < downerL; i++) {
        table[thisTime + i * 7] = squaresCalc[thisTime];
      }
      break;
    } else if (table[thisTime + downerL * 7] === null) {
      break;
    }
  }

  return table;
};
