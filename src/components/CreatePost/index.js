import React, { useState } from "react";
import Card from "../Card";

function CreatePost({
  onSubmit = (state) => {
    console.log("State:", state);
  },
  isLoading = false
}) {
  const [state, setState] = useState({
    content: "",
    writer: "",
    postedOn: new Date(),
  });
  const handleSubmit = (state) => {
    onSubmit({ ...state, postedOn: new Date() });
  };
  return (
    <Card className={isLoading ? 'posts-loading' : ''}>
      <textarea
        autoFocus={true}
        draggable={false}
        onChange={(event) => {
          setState((state) => ({ ...state, content: event.target.value }));
        }}
        value={state.content}
        className="bg-transparent placeholder-white "
        placeholder="Write a note for the world..."
        style={{ resize: "none", border: "none" }}
        name="post-content"
        id=""
        cols="30"
        rows="12"
      ></textarea>

      <input
        onChange={(event) => {
          setState((state) => ({ ...state, writer: event.target.value }));
        }}
        value={state.writer}
        placeholder="Who is the great poster ... "
        type="text"
        className="bg-transparent placeholder-white "
      />

      <button
        onClick={() => {
          handleSubmit(state);
        }}
        className="bg-midnightDark px-4 py-2 rounded self-center text-lightblue transition-all hover:shadow-xl hover:bg-lightblue hover:text-white"
      >
        Post to the world!
      </button>
    </Card>
  );
}

export default CreatePost;
