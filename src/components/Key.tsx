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
  const [style, setStyle] = useState("");
  const text = keyValue === "Backspace" ? "←" : keyValue; // change text in backspace for symbol

  // on guesslist change, apply styles to keys
  useEffect(() => {
    if (keyValue === "Enter" || keyValue === "Backspace") return;

    if (style === "bg-gray-800" || style === "bg-wgreen") return;

    guessList
      .filter((word) => word.includes(keyValue))
      .forEach((word) => {
        if (!solution.includes(keyValue)) {
          setStyle("bg-gray-800");
          return;
        }

        word.split("").some((ch, i) => solution[i] === ch && keyValue === ch)
          ? setStyle("bg-wgreen")
          : setStyle("bg-wyellow");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessList]);

  return (
    <span
      onClick={() => handleKeyInput(keyValue)}
      className={`cursor-pointer flex items-center justify-center uppercase bg-gray-600 rounded-[4px] shadow-lg w-full h-14 flex-1 ${
        flex ? flex : ""
      } ${style}`}
    >
      {text}
    </span>
  );
};

export default Key;
