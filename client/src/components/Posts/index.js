import React from "react";
import Card from "../Card";
import Post from "../Post";
import {v4} from 'uuid'

const loadingComponent = () => (
  <div className="p-3 gap-4 flex-wrap flex w-full flex-1 justify-center">
    {["x", "x", "x", "x", "x", "x"].map((_) => (
      <Card key={v4()} className="h-96 posts-loading" />
    ))}
  </div>
);

function Posts({
  posts = [],
  isLoading = true,
  handleShowComments = (id) => {},
  handleSetError = () => {},
}) {
  return isLoading ? (
    loadingComponent()
  ) : (
    <div className="p-3 gap-4 flex-wrap flex w-full flex-1 justify-center">
      {posts.map(({id,writer,content,postedOn, img}) => (
        <Post
          key={id}
          writer={writer}
          content={content}
          postedOn={postedOn}
          handleSubmitClick={handleShowComments}
          img={img}
          id={id}
          handleSetError = {handleSetError}
        />
      ))}
    </div>
  );
}

export default Posts;
