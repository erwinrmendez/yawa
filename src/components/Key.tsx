import React, { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { useSolution } from "../hooks/useSolution";

interface IKey {
  keyValue: string;
  flex?: string;
}

const Key: React.FC<IKey> = ({ keyValue, flex }) => {
  const { handleKeyInput, guessList } = useGameContext();
  const { solution } = useSolution();

  // styles for keyboard
  const [background, setBackground] = useState("");
  const text = keyValue === "Backspace" ? "←" : keyValue; // change text in backspace for symbol

  // on guesslist change, apply styles to keys
  useEffect(() => {
    if (keyValue === "Enter" || keyValue === "Backspace") return;

    if (background === "bg-gray-800" || background === "bg-wgreen") return;

    guessList
      .filter((word) => word.includes(keyValue))
      .forEach((word) => {
        if (!solution.includes(keyValue)) {
          setBackground("bg-gray-800");
          return;
        }

        word.split("").some((ch, i) => solution[i] === ch && keyValue === ch)
          ? setBackground("bg-wgreen")
          : setBackground("bg-wyellow");
      });
  }, [guessList, keyValue, solution, background]);

  return (
    <span
      onClick={() => handleKeyInput(keyValue)}
      className={`cursor-pointer flex items-center justify-center uppercase rounded-[4px] shadow-lg w-full h-14 flex-1 ${
        flex ? flex : ""
      } ${background ? background : "bg-gray-600"}`}
    >
      {text}
    </span>
  );
};

export default Key;
