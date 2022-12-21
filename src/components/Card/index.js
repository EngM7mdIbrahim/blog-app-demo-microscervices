import React from "react";

function Card({ children, className }) {
  return (
    <div
      className={`p-3 rounded flex flex-col gap-4 bg-midnightLight w-11/12 max-w-md ${
        className ? className : ""
      }`}
      style={{ minWidth: "280px" }}
    >
      {children}
    </div>
  );
}

export default Card;
