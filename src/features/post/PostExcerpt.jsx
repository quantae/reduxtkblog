import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";


/**
 * In order to reduced the unnecessary re-rendering of the PostExcerpt component, we use React.memo
 * 
 * thus, we change the const postExcerpt to: let PostExcerpt 
 */
const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));
  return (
    <article className="post-excerpt">
      {/*console.log('posts from post list: ', post)*/}
      <h3>{post.title}</h3>
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
      <p className="excerpt">{post.body.substring(0, 72)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`}>View Post</Link>
    </article>
  );
};

// PostExcerpt = React.memo(PostExcerpt);

export default PostExcerpt;
