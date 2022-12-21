import React, { useEffect, useState } from "react";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";
import "./index.css";

const App = () => {
  const [state, setState] = useState({
    posts: [
      {
        writer: "Mohamed Ibrahim",
        content: "Hello world!",
        comments: [],
        postedOn: new Date(),
      },{
        writer: "Mohamed Ibrahim",
        content: "Hello world!",
        comments: [],
        postedOn: new Date(),
      },{
        writer: "Mohamed Ibrahim",
        content: "Hello world!",
        comments: [],
        postedOn: new Date(),
      },{
        writer: "Mohamed Ibrahim",
        content: "Hello world!",
        comments: [],
        postedOn: new Date(),
      },{
        writer: "Mohamed Ibrahim",
        content: "Hello world!",
        comments: [],
        postedOn: new Date(),
      },{
        writer: "Mohamed Ibrahim",
        content: "Hello world!",
        comments: [],
        postedOn: new Date(),
      },{
        writer: "Mohamed Ibrahim",
        content: "Hello world!",
        comments: [],
        postedOn: new Date(),
      },{
        writer: "Mohamed Ibrahim",
        content: "Hello world!",
        comments: [],
        postedOn: new Date(),
      },{
        writer: "Mohamed Ibrahim",
        content: "Hello world!",
        comments: [],
        postedOn: new Date(),
      },{
        writer: "Mohamed Ibrahim",
        content: "Hello world!",
        comments: [],
        postedOn: new Date(),
      },
    ],
    isPosting: false,
    isGettingPosts: false,
  });

  const handleFecthingPosts = () => {};

  const handlePostingPost = (content) => {};

  const handleShowComments = (comments) =>{

  }

  useEffect(() => {
    if (!state.isPosting) {
      console.log("Fetching new posts ...");
      handleFecthingPosts();
    }
  }, [state.isPosting]);
  return (
    <div className="w-screen min-h-screen bg-midnightDark flex flex-col gap-4 justify-start items-center from-gray-50 text-white p-7">
      <h1 className="text-slate-900 font-extrabold text-4xl  sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
        Speak to the world!
      </h1>
      <CreatePost isLoading={state.isPosting} onSubmit={handlePostingPost} />
      <hl className=" bg-midnightLight w-full h-0.5" />
      <h1 className="text-slate-900 font-extrabold text-4xl  sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
        Global Billboard
      </h1>
      <Posts posts={state.posts} isLoading={state.isGettingPosts} />
    </div>
  );
};
export default App;
