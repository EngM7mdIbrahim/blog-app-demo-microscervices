import React from "react";
import Card from "../Card";
import Post from "../Post";

const loadingComponent = () => (
  <div className="p-3 gap-4 flex-wrap flex w-full flex-1 justify-center">
    {["x", "x", "x", "x", "x", "x"].map((_) => (
      <Card key={crypto.randomUUID()} className="h-96 posts-loading" />
    ))}
  </div>
);

function Posts({
  posts = [],
  isLoading = true,
  handleShowComments = (id) => {},
}) {
  console.log("Posts:", posts);
  return isLoading ? (
    loadingComponent()
  ) : (
    <div className="p-3 gap-4 flex-wrap flex w-full flex-1 justify-center">
      {posts.map(({id,writer,content,postedOn}) => (
        <Post
          key={id}
          writer={writer}
          content={content}
          postedOn={postedOn}
          handleSubmitClick={handleShowComments}
        />
      ))}
    </div>
  );
}

export default Posts;
