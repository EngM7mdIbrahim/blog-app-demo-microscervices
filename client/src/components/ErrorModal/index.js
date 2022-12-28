import React from "react";

import Card from "../Card";
export default function ErrorModal({
  error = "",
  handleHideError = () => { console.log('Should hide the error modal, but no handler passed!')},
}) {
  return (
    <div
      style={{ backdropFilter: "blur(5px)" }}
      className={`fixed h-screen w-screen top-0 flex-col justify-center items-center opacity-0 flex ${
        error !== "" ? "animate-fadeIn" : "animate-fadeOut"
      }`}
    >
      <Card style={{ height: "30rem" }} className="bg-red-700 max-w-4xl ">
        <div className="flex gap-1 justify-start items-center">
          <h1 className="text-slate-900 flex-1 font-extrabold text-4xl  tracking-tight text-left dark:text-white">
            Error
          </h1>

          <img
            onClick={handleHideError}
            src="/images/crossed.png"
            className="w-12 h-12 rounded-full p-2 object-cover  hover:shadow-lg transition-all cursor-pointer "
          />
        </div>
        <hr className="border-white w-full" />
        <div className="flex w-full flex-1 items-center justify-center">
          <h1 className="flex-1 font-semibold text-4xl  text-center  tracking-tight dark:text-white">
            {error}
          </h1>
        </div>
      </Card>
    </div>
  );
}
