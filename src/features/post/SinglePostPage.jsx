import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { useParams, Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const SinglePostPage = () => {
  const { postId } = useParams();

  // retrieve postId
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article className="post">
     <Link to='/'>Go to Posts</Link>
      <h2>{post.title}</h2>
      <p>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <p className="post-content">{post.body}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/edit/${post.id}`}>Edit Post</Link>
    </article>
  );
};

export default SinglePostPage;
