import React from "react";

function Card({ children, className = "", style }) {
  const isBackgroundSet = className.includes('bg-');
  return (
    <div
      className={`p-3 rounded flex flex-col gap-4 ${isBackgroundSet ? '' : ' bg-midnightLight'} w-11/12 max-w-md ${
        className ? className : ""
      }`}
      style={{ minWidth: "280px" ,...style }}
    >
      {children}
    </div>
  );
}

export default Card;
