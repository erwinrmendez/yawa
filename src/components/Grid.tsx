import { useCallback, useEffect } from "react";

// custom hooks, variables and components
import { useGameContext } from "../contexts/GameContext";
import { MAX_ATTEMPS } from "../utils/constants";
import Row from "./Row";
import Toast from "./Toast";

const Grid = () => {
  const { handleKeyInput, isMessageVisible, message } = useGameContext();

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
      {isMessageVisible && <Toast message={message} />}
      <div className="flex flex-col gap-1 mt-6">
        {[...Array(MAX_ATTEMPS)].map((_, i) => (
          <Row key={i} rowIndex={i} />
        ))}
      </div>
    </>
  );
};

export default Grid;
