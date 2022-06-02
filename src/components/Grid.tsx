import { useCallback, useEffect } from "react";

// custom hooks, variables and components
import { useGameContext } from "../contexts/GameContext";
import { useNotification } from "../contexts/NotificationContext";
import { MAX_ATTEMPS } from "../utils/constants";
import Row from "./Row";
import Toast from "./Toast";

const Grid = () => {
  const { activeRow, handleKeyInput, letters, guessList } = useGameContext();
  const { show, message } = useNotification();

  const onKeyUp = useCallback(
    (e: KeyboardEvent) => {
      handleKeyInput(e.key);
    },
    [handleKeyInput]
  );

  useEffect(() => {
    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, [onKeyUp]);

  return (
    <>
      {show && <Toast message={message} />}
      <div className="flex flex-col gap-1 mt-4">
        {[...Array(MAX_ATTEMPS)].map((_, i) => (
          <Row
            key={i}
            letters={activeRow === i ? letters : guessList[i]}
            rowIndex={i}
          />
        ))}
      </div>
    </>
  );
};

export default Grid;
