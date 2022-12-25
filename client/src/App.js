import React, { useEffect, useState } from "react";
import CommentsModal from "./components/CommentsModal";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";
import "./index.css";
import generateName from "./utils/nameGenerator";
import getImage from "./utils/images";
import sleep from "./utils/sleep";
import axios from "axios";

const App = () => {
  const [state, setState] = useState({
    posts: [
      {
        writer: "Mohamed Ibrahim",
        content: "Hello world!",
        comments: [],
        postedOn: new Date(),
        id: crypto.randomUUID(),
      },
    ],
    isPosting: false,
    isGettingPosts: true,
    isGettingComments: false,
    defaultName: generateName(),
    defaultImage: getImage(),
    //Modal Control
    postClicked: 0,
    showModal: false,
    isCommenting: false,
  });

  const handleFecthingPosts = async () => {
    setState((state) => ({ ...state, isGettingPosts: true }));
    await sleep(3000);
    try {
      const response = await axios.get("http://localhost:4002/posts");
      const postsObj = await response.data;
      const posts = Object.values(postsObj);
      console.log('fETCHED pOSTS:',posts)
      setState((state) => ({ ...state, isGettingPosts: false, posts }));
    } catch (e) {
      console.log("Cannot get posts due to this error:", e);
      setState((state) => ({ ...state, isGettingPosts: false }));
    }
  };

  const handlePostingPost = async (content) => {
    setState((state) => ({ ...state, isPosting: true }));
    console.log("Post to be posted:", content);
    await sleep(3000);
    try {
      const response = await axios.post("http://localhost:4000/posts", {
        ...content,
        img: state.defaultImage,
        writer: content.writer || state.defaultName,
      });
      const postObj = await response.data;

      setState((state) => ({
        ...state,
        isPosting: false,
        posts: [...state.posts, postObj],
      }));
    } catch (e) {
      console.log("Cannot post due to this error:", e);
      setState((state) => ({
        ...state,
        isPosting: false,
      }));
    }
  };

  const handleShowComments = (postID) => {
    console.log('Posts:', state.posts)
    const postIndex = state.posts.findIndex((post) => post.id === postID);
    console.log('PostIndex:', postIndex)
    console.log('PostID:', postID)
    setState({ 
      ...state,
      showModal: true,
      postClicked: postIndex === -1 ? 0 : postIndex,
    });
  };

  const handleCreateComment = async (comment, postID) => {
    setState((state) => ({ ...state, isCommenting: true }));
    await sleep(3000);
    try {
      await axios.post(`http://localhost:4001/posts/${postID}/comments/`, comment);
    } catch (e) {
      console.log("Cannot comment due this error:", e);
    }
    console.log("Commented!");
    setState((state) => ({ ...state, isCommenting: false }));
  };

  const handleHideComments = () => {
    setState({ ...state, showModal: false });
  };

  useEffect(() => {
    if (!state.isPosting) {
      handleFecthingPosts();
    }
  }, [state.isPosting]);
  return (
    <div className="w-screen min-h-screen bg-midnightDark flex flex-col gap-4 justify-start items-center from-gray-50 text-white p-7">
      <CommentsModal
        isLoading={state.isCommenting || state.isGettingComments}
        postID={state.posts[state.postClicked].id}
        comments={state.posts[state.postClicked].comments}
        showModal={state.showModal}
        handleHideComments={handleHideComments}
        handleCommentCreate={handleCreateComment}
      />
      <h1 className="text-slate-900 font-extrabold text-4xl  sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
        Speak to the world!
      </h1>
      <CreatePost isLoading={state.isPosting} onSubmit={handlePostingPost} />
      <hr className=" bg-midnightLight w-full h-0.5" />
      <h1 className="text-slate-900 font-extrabold text-4xl  sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
        Global Billboard
      </h1>
      <Posts
        posts={state.posts}
        isLoading={state.isGettingPosts}
        handleShowComments={handleShowComments}
      />
    </div>
  );
};
export default App;
