import React from "react";
import Row from "./Row";

const Grid = ({ attempts = 6 }) => {
  return (
    <div className="flex flex-col gap-1 mt-8">
      {[...Array(attempts)].map((e, i) => (
        <Row key={i} />
      ))}
    </div>
  );
};

export default Grid;
