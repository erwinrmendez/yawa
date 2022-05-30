import React from "react";
import Tile from "./Tile";

const Row = ({ size = 5 }) => {
  return (
    <div className="flex gap-1">
      {[...Array(size)].map((e, i) => (
        <Tile key={i} />
      ))}
    </div>
  );
};

export default Row;
