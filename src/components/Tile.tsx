import React, { useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";
import { useAnimation } from "../hooks/useAnimation";

interface ITile {
  index: number;
  char: string;
  background: string;
  initialAnimation: string;
  revealTile: boolean;
}

const Tile: React.FC<ITile> = ({
  index,
  char,
  background,
  initialAnimation,
  revealTile,
}) => {
  // get values from custom hooks
  const { animate, delay, reveal, bounce } = useAnimation(
    initialAnimation,
    100
  );
  const { animation } = useGameContext();

  // apply reveal animation (flip)
  useEffect(() => {
    if (animation === "reveal" && revealTile) {
      reveal(400, 2500);
    }
  }, [animation, reveal, revealTile]);

  // apply bounce animation on letter input
  useEffect(() => {
    if (!revealTile && char !== "") {
      bounce();
    }
  }, [bounce, char, revealTile]);

  // concatenate class names to single string
  let tileStyles = `${background} ${animate} ${
    char === "" ? "border-gray-800" : "border-gray-600"
  } flex items-center justify-center p-2 text-3xl font-bold uppercase border-2 w-16 h-16 leading-normal transition-[background] ease-in-out`;

  return (
    <span
      className={tileStyles}
      style={{
        animationDelay: `${delay * index}ms`,
        transitionDelay: `${delay * (index + 1)}ms`,
      }}
    >
      {char}
    </span>
  );
};

export default Tile;
