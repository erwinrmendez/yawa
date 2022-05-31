import React, { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { useSolution } from "../hooks/useSolution";

import { WORD_LENGTH } from "../utils/constants";
import { getStyles } from "../utils/format";
import Tile from "./Tile";

interface IRow {
  letters: string;
  rowIndex: number;
}

const Row: React.FC<IRow> = ({ letters = "", rowIndex }) => {
  const [styles, setStyles] = useState<{ [key: number]: string } | null>(null);
  const { guessList, activeRow } = useGameContext();
  const { solution } = useSolution();
  const nChars = letters.length;

  useEffect(() => {
    if (rowIndex >= activeRow) return;

    setStyles(getStyles(guessList[rowIndex], solution));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRow]);

  return (
    <div className="flex gap-1">
      {[...Array(WORD_LENGTH)].map((_, i) => (
        <Tile
          key={i}
          char={i >= nChars ? "" : letters[i]}
          background={styles ? styles[i] : ""}
        />
      ))}
    </div>
  );
};

export default Row;
