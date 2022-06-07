import React, { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { useAnimation } from "../hooks/useAnimation";
import { useSolution } from "../hooks/useSolution";

import { WORD_LENGTH } from "../utils/constants";
import { getStyles } from "../utils/format";
import Tile from "./Tile";

interface IRow {
  rowIndex: number;
}

const Row: React.FC<IRow> = ({ rowIndex }) => {
  // get values from custom hooks
  const { solution } = useSolution();
  const { guessList, letters, animation, resetAnimation } = useGameContext();
  const { animate, shake } = useAnimation("animate-none", 0);

  // local state and variables
  const [styles, setStyles] = useState<{ [key: number]: string } | null>(null);
  let activeRow = guessList.length;
  let isActiveRow = activeRow === rowIndex;
  let reveal = rowIndex < activeRow;
  let rowLetters = isActiveRow ? letters : guessList[rowIndex];
  let nChars = rowLetters?.length || 0;

  // apply shake animation to row on incorrect input
  useEffect(() => {
    if (animation === "shake") {
      shake();
      resetAnimation();
    }
  }, [animation, shake, resetAnimation]);

  // apply styles to submitted guessses
  useEffect(() => {
    if (rowIndex >= activeRow) return;

    setStyles(getStyles(guessList[rowIndex], solution));
  }, [activeRow, guessList, rowIndex, solution]);

  return (
    <div className={`${isActiveRow && animate} flex gap-1`}>
      {[...Array(WORD_LENGTH)].map((_, i) => (
        <Tile
          key={i}
          index={i}
          char={i >= nChars ? "" : rowLetters[i]}
          background={styles ? styles[i] : ""}
          revealTile={reveal}
          initialAnimation={reveal ? "animate-flip" : "animate-none"} // if reveal, load with flip animation
        />
      ))}
    </div>
  );
};

export default Row;
