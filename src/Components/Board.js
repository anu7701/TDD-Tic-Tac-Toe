import React from "react";
import { useState } from 'react';


function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  function isTie(squares)
  {
    for(let i=0; i<squares.length;i++)
    {
        if(squares[i]===null)
        return false;
    }
    return true;
  }

const Board = ()=>{
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    function handleClick(i)
    {
        if(squares[i] || calculateWinner(squares))
        {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
          } else {
            nextSquares[i] = "O";
          }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else if(winner===null && !isTie(squares)){
        status = "Next player: " + (xIsNext ? "X" : "O");
    }
    else{
        status= "Tie Match"
    }
    return(
        <React.Fragment>
            <div data-testid='winner'>{status}</div>
            
            <div data-testid="board-row" className="board-row">
                < button data-testid="square0" value={squares[0]} onClick={()=>handleClick(0)}>{squares[0]}</button>
                < button data-testid="square1" value={squares[1]} onClick={()=>handleClick(1)}>{squares[1]}</button>
                < button data-testid="square2" value={squares[2]} onClick={()=>handleClick(2)}>{squares[2]}</button>
            </div>
            <div data-testid="board-row" className="board-row">
                < button data-testid="square3" value={squares[3]} onClick={()=>handleClick(3)}>{squares[3]}</button>
                < button data-testid="square4" value={squares[4]} onClick={()=>handleClick(4)}>{squares[4]}</button>
                < button data-testid="square5" value={squares[5]} onClick={()=>handleClick(5)}>{squares[5]}</button>
            </div>
            <div data-testid="board-row" className="board-row">
                < button data-testid="square6" value={squares[6]} onClick={()=>handleClick(6)}>{squares[6]}</button>
                < button data-testid="square7" value={squares[7]} onClick={()=>handleClick(7)}>{squares[7]}</button>
                < button data-testid="square8" value={squares[8]} onClick={()=>handleClick(8)}>{squares[8]}</button>
            </div>
        </React.Fragment>
    );
}
export default Board;