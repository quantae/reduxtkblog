import { useSelector } from "react-redux";
import { selectAllPosts, selectAllPostsCount } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";

import React from "react";
import TimeAgo from "./TimeAgo";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const postCount = useSelector(selectAllPostsCount);

  // Sort posts in reverse chronological order by datetime string
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
   // Now we will map over the orderedPosts array instead of the posts array.
    <article className="post-excerpt" key={post.id}>
      {console.log('posts from post list: ', post)}
      <h3>{post.title}</h3>
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
      <p>{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
    </article>
  ));

  return (
    <section className="posts-list">
      <h2>Posts ({postCount})</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
