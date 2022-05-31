import React from "react";

interface ITile {
  char: string;
  background: string;
}

const Tile: React.FC<ITile> = ({ char, background }) => {
  let tileStyles =
    background +
    "flex items-center justify-center p-2 text-4xl font-bold leading-snug uppercase border border-gray-800 w-14 h-14";

  return <span className={tileStyles}>{char}</span>;
};

export default Tile;
