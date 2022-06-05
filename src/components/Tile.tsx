import React from "react";

interface ITile {
  char: string;
  background: string;
}

const Tile: React.FC<ITile> = ({ char, background }) => {
  let tileStyles = `${background} ${
    char ? "border-gray-600" : "border-gray-800"
  } flex items-center justify-center p-2 text-3xl font-bold uppercase border  w-14 h-14 leading-none`;

  return <span className={tileStyles}>{char}</span>;
};

export default Tile;
