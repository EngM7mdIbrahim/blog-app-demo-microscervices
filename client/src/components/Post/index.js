import React from "react";
import Card from "../Card";

import timeAgo from "../../utils/date";

function Post({
  writer,
  postedOn,
  content,
  id,
  img,
  handleSubmitClick = (id) => {},
  handleSetError = () => {},
}) {
  return (
    <Card style={{ minHeight: "24rem" }}>
      <div
        id="post-title"
        className="flex gap-4 h-16 justify-start items-center"
      >
        <img src={img} className="h-14 w-14 rounded-full object-cover" />
        <h2 className="text-slate-900 font-bold text-3xl">{writer}</h2>
      </div>

      <div
        id="post-content"
        className="flex-1 flex items-center justify-center"
      >
        <h3
          style={{ overflowWrap: "anywhere" }}
          className="font-semibold text-lg w-full text-center"
        >
          {content}
        </h3>
      </div>

      <div id="post-footer" className="flex justify-start">
        <button
          onClick={() => {
            handleSubmitClick(id);
          }}
          className="text-lightblue text-left text-base font-semibold flex-1 hover:text-white transition-all"
        >
          Show comments
        </button>
        <p className="text-base">Posted {timeAgo(postedOn)}</p>
      </div>
    </Card>
  );
}

export default Post;
