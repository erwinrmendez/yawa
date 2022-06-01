import React from "react";

interface ITile {
  char: string;
  background: string;
}

const Tile: React.FC<ITile> = ({ char, background }) => {
  let tileStyles =
    background +
    "flex items-center justify-center p-2 text-3xl font-bold uppercase border border-gray-800 w-16 h-16 leading-none";

  return <span className={tileStyles}>{char}</span>;
};

export default Tile;
