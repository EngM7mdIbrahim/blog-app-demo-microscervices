import React, { useEffect, useState } from "react";
import CommentsModal from "./components/CommentsModal";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";
import "./index.css";
import generateName from "./utils/nameGenerator";
import getImage from "./utils/images";
import sleep from "./utils/sleep";
import axios from "axios";
import ErrorModal from "./components/ErrorModal";
import {v4} from 'uuid'

const App = () => {
  const [state, setState] = useState({
    posts: [
      {
        writer: "Mohamed Ibrahim",
        content: "Hello world!",
        comments: [],
        postedOn: new Date(),
        id: v4(),
      },
    ],
    isPosting: false,
    isGettingPosts: false,
    isGettingComments: false,
    defaultName: generateName(),
    defaultImage: getImage(),
    //Modal Control
    postClicked: 0,
    showModal: false,
    isCommenting: false,
    error: "",
  });

  const handleFecthingData = async (isPosts) => {
    const key = isPosts ? "isGettingPosts" : "isGettingComments";
    setState((state) => ({
      ...state,
      [key]: true,
    }));
    try {
      const response = await axios.get("http://posts.com/posts/");
      const postsObj = await response.data;
      const posts = Object.values(postsObj);
      console.log("fETCHED pOSTS:", posts);
      setState((state) => ({
        ...state,
        [key]: false,
        posts,
      }));
    } catch (e) {
      console.log("Cannot get posts due to this error:", e);
      setState((state) => ({
        ...state,
        [key]: false,
        error: "Cannot get posts due to this error:" + JSON.stringify(e),
      }));
    }
  };

  const handlePostingPost = async (content) => {
    setState((state) => ({ ...state, isPosting: true }));
    try {
      const response = await axios.post("http://posts.com/posts/create/", {
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
      handleFecthingData(true);
    } catch (e) {
      console.log("Cannot post due to this error:", e);
      setState((state) => ({
        ...state,
        isPosting: false,
        error: "Cannot get posts due to this error:" + JSON.stringify(e),
      }));
    }
  };

  const handleShowComments = (postID) => {
    const postIndex = state.posts.findIndex((post) => post.id === postID);
    setState({
      ...state,
      showModal: true,
      postClicked: postIndex === -1 ? 0 : postIndex,
    });
  };

  const handleCreateComment = async (comment, postID) => {
    setState((state) => ({ ...state, isCommenting: true }));
    console.log("Will create a post for this:", postID);
    console.log("The comment is:", comment);
    try {
      await axios.post(
        `http://posts.com/posts/${postID}/comments/`,
        comment
      );
      handleFecthingData(false);
    } catch (e) {
      console.log("Cannot comment due this error:", e);
      setState((state) => ({
        ...state,
        error: "Cannot get posts due to this error:" + JSON.stringify(e),
      }));
    }
    console.log("Commented!");
    setState((state) => ({ ...state, isCommenting: false }));
  };

  const handleHideComments = () => {
    setState({ ...state, showModal: false });
  };

  const handleHideError = () => {
    setState((state) => ({ ...state, error: "" }));
  };
  const handleSetError = (error) => {
    setState((state) => ({ ...state, error: "" }));
  };

  useEffect(()=>{
    handleFecthingData(true)
  },[])
  return (
    <div className="w-screen min-h-screen bg-midnightDark flex flex-col gap-4 justify-start items-center from-gray-50 text-white p-7">
      <ErrorModal error={state.error} handleHideError={handleHideError} />
      <CommentsModal
        handleSetError={handleSetError}
        defaultImage={state.defaultImage}
        defaultName={state.defaultName}
        isCommenting={state.isCommenting}
        isGettingComments={state.isGettingComments}
        postID={state.posts[state.postClicked].id}
        comments={state.posts[state.postClicked].comments}
        showModal={state.showModal}
        handleHideComments={handleHideComments}
        handleCommentCreate={handleCreateComment}
      />
      <h1 className="text-slate-900 font-extrabold text-4xl  sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
        Speak to the world!
      </h1>
      <CreatePost
        handleSetError={handleSetError}
        isLoading={state.isPosting}
        onSubmit={handlePostingPost}
      />
      <hr className=" bg-midnightLight w-full h-0.5" />
      <h1 className="text-slate-900 font-extrabold text-4xl  sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
        Global Billboard
      </h1>
      <Posts
        handleSetError={handleSetError}
        posts={state.posts}
        isLoading={state.isGettingPosts}
        handleShowComments={handleShowComments}
      />
    </div>
  );
};
export default App;
