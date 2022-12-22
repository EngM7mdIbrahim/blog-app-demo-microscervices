import React from "react";
import generateName from "../../utils/nameGenerator";
import getImage from "../../utils/images";

import Card from "../Card";
import Comment from "../Comment";
import CreateComment from "../CreateComment";

export default function CommentsModal({
  defaultName = generateName(),
  defaultImage = getImage(),
  isLoading = false,
  showModal  = false,
  comments = [
    {
      content: "Bahbik y nono!!",
      writer: "Mohamed Ibrahim",
      postedOn: new Date(),
    },
    {
      content: "Bahbik y nono!!",
      writer: "Mohamed Ibrahim",
      postedOn: new Date(),
    },
    {
      content: "Bahbik y nono!!",
      writer: "Mohamed Ibrahim",
      postedOn: new Date(),
    },
    {
      content: "Bahbik y nono!!",
      writer: "Mohamed Ibrahim",
      postedOn: new Date(),
    },
    {
      content: "Bahbik y nono!!",
      writer: "Mohamed Ibrahim",
      postedOn: new Date(),
    },
  ],
  handleCommentCreate = (comment) => {},
  handleHideComments = ()=>{}
}) {
  return (
    <div
      style={{ backdropFilter: "blur(5px)" }}
      className={`fixed h-screen w-screen top-0 flex-col justify-center items-center opacity-0 flex ${showModal ? 'animate-fadeIn': 'animate-fadeOut'}`}
    >
      <Card
        style={{ height: "30rem" }}
        className={`${isLoading ? "posts-loading" : ""} max-w-4xl`}
      >
        <div className="flex gap-1 justify-start items-center">
          <h1 className="text-slate-900 flex-1 font-extrabold text-4xl  tracking-tight text-left dark:text-white">
            Comments
          </h1>
          <img onClick={()=>{handleHideComments()}} src="/images/crossed.png" className="w-12 h-12 rounded-full p-2 object-cover hover:bg-gray-700 hover:shadow-lg transition-all cursor-pointer " />
        </div>
        <div
          id="comments-body"
          className="flex flex-1 flex-col gap-3 justify-start items-start overflow-y-scroll border-b pb-3 "
        >
          {(!comments || comments.length === 0) && (
            <h1 className="text font-semibold self-center">
              No comments yet for this post!
            </h1>
          )}
          {comments.map(({ content, postedOn, writer }) => (
            <Comment
              key={crypto.randomUUID()}
              content={content}
              postedOn={postedOn}
              writer={writer}
            />
          ))}
        </div>
        <CreateComment
          defaultName={defaultName}
          img={defaultImage}
          onSubmit={handleCommentCreate}
        />
      </Card>
    </div>
  );
}
