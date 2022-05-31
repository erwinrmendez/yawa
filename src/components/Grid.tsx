import { useEffect } from "react";

// custom hooks, variables and components
import { useGameContext } from "../contexts/GameContext";
import { MAX_ATTEMPS } from "../utils/constants";
import Row from "./Row";

const Grid = () => {
  const { activeRow, handleKeyUp, letters, guessList } = useGameContext();

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  return (
    <div className="flex flex-col gap-1 mt-8">
      {[...Array(MAX_ATTEMPS)].map((_, i) => (
        <Row
          key={i}
          letters={activeRow === i ? letters : guessList[i]}
          rowIndex={i}
        />
      ))}
    </div>
  );
};

export default Grid;
