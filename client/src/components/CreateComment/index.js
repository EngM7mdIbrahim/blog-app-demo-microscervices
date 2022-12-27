import React, { useState, useEffect } from "react";
import getImage from "../../utils/images";
import generateName from "../../utils/nameGenerator";

const INI_STATE = { writer: "", content: "" };

function handleSubmit(onSubmit=()=>{}, state, postID, defaultName){
  console.log('State: ', state)
  onSubmit({
    writer: !state.writer || state.writer === "" ? defaultName : state.writer,
    postedOn: new Date(),
    content:
      !state.content || state.content === ""
        ? "Just an empty comment!"
        : state.content,
  }, postID);
}

export default function CreateComment({
  img = getImage(),
  postID = "",
  defaultName = generateName(),
  isModalShown = false,
  onSubmit = (state) => {},
}) {
  const [state, setState] = useState(INI_STATE);
  
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter" && isModalShown) {
        event.preventDefault();
        handleSubmit(onSubmit, state, postID, defaultName);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [postID,state, isModalShown, defaultName, onSubmit]);
  return (
    <div className=" flex flex-row gap-2 justify-start items-start self-stretch">
      <img src={img} alt="User" className="h-10 w-10 rounded-full object-cover" />
      <div
        style={{ minHeight: "5rem" }}
        className="rounded-2xl bg-midnightDark py-2 px-4 flex flex-col justify-start items-start flex-1 overflow-auto gap-0"
      >
        <div className="flex flex-1 gap-1 self-stretch">
          <input
            value={state.writer}
            onChange={(event) => {
              event.preventDefault();
              setState((state) => ({ ...state, writer: event.target.value }));
            }}
            type="text"
            placeholder="Tell us your name ..."
            className="text-lightblue bg-transparent placeholder-lightblue w-full text-base sm:text-lg"
          />
          <button
            onClick={() => {
              handleSubmit(state, postID);
            }}
            className="text-sm font-semibold text-lightblue text-right"
          >
            Send
          </button>
        </div>
        <textarea
          value={state.content}
          onChange={(event) => {
            event.preventDefault();
            setState((state) => ({ ...state, content: event.target.value }));
          }}
          autoFocus={true}
          draggable={false}
          className="bg-transparent placeholder-white w-full h-16"
          placeholder="Write a note for the world..."
          style={{ resize: "none", border: "none" }}
          name="comment-content"
          id=""
        ></textarea>
      </div>
    </div>
  );
}
