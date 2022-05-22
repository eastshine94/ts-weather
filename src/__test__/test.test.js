let answer = Number.MAX_SAFE_INTEGER;

const xPos = [-1, 1, 0, 0];
const yPos = [0, 0, -1, 1];
function dfs(board, pos, direction, totalCost) {
  const len = board.length;
  const [currY, currX] = pos;
  if (currY === len - 1 && currX === len - 1) {
    answer = Math.min(answer, totalCost + 100);
    return;
  }

  for (let i = 0; i < 4; i++) {
    const y = currY + yPos[i];
    const x = currX + xPos[i];
    if (y < 0 || y >= len || x < 0 || x >= len) {
      continue;
    }

    if (board[y][x] === 0) {
      const moved = i < 2 ? 'x' : 'y';
      const cost = direction === null || moved === direction ? 100 : 500;
      if (totalCost + cost >= answer) {
        continue;
      }
      board[y][x] = 1;
      dfs(board, [y, x], moved, totalCost + cost);
      board[y][x] = 0;
    }
  }
}

function solution(board) {
  dfs(board, [0, 0], null, 0);
  return answer;
}
