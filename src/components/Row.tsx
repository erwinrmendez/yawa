import React, { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { useSolution } from "../hooks/useSolution";

import { WORD_LENGTH } from "../utils/constants";
import { getStyles } from "../utils/format";
import Tile from "./Tile";

interface IRow {
  rowIndex: number;
}

const Row: React.FC<IRow> = ({ rowIndex }) => {
  const [styles, setStyles] = useState<{ [key: number]: string } | null>(null);
  const { guessList, letters } = useGameContext();
  const { solution } = useSolution();
  let activeRow = guessList.length;
  let rowLetters = activeRow === rowIndex ? letters : guessList[rowIndex];
  let nChars = rowLetters?.length || 0;

  useEffect(() => {
    if (rowIndex >= activeRow) return;

    setStyles(getStyles(guessList[rowIndex], solution));
  }, [activeRow, guessList, rowIndex, solution]);

  return (
    <div className="flex gap-1">
      {[...Array(WORD_LENGTH)].map((_, i) => (
        <Tile
          key={i}
          char={i >= nChars ? "" : rowLetters[i]}
          background={styles ? styles[i] : ""}
        />
      ))}
    </div>
  );
};

export default Row;
