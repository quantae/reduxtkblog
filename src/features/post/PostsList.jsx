import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import TimeAgo from "./TimeAgo";


// selector imports
import {
  selectAllPosts,
  selectPostIds,
  getPostsError,
  getPostsStatus,
  fetchPosts,
  selectAllPostsCount,
} from "./postsSlice";

// component imports
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  console.log('PostList rendered')
  const dispatch = useDispatch();
  // we replace the posts with orderedPostsIds
  // const posts = useSelector(selectAllPosts);
  const orderedPostId = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  const postCount = useSelector(selectAllPostsCount);

  // useEffect to fetch posts from the API
  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  // Sort posts in reverse chronological order by datetime string
  // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
  // const renderedPosts = orderedPosts.map((post) => (
  //   <article className="post-excerpt">
  //     {console.log("posts from post list: ", post)}
  //     <h3>{post.title}</h3>
  //     <PostAuthor userId={post.userId} />
  //     <TimeAgo timestamp={post.date} />
  //     <p>{post.content.substring(0, 100)}</p>
  //     <ReactionButtons post={post} />
  //   </article>
  // ));

  // re replace the renderedPosts and orderedPosts variables with the following
  let content;
  if (postsStatus === "loading") {
    content = <p>"loading..."</p>;
  } else if (postsStatus === "succeeded") {
    // we shall also change this code to use the orderedPostIds
    // const orderedPosts = posts
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date));

    // we shall set the content post differently.
    //   content = orderedPosts.map((post) => (
    //   <PostExcerpt key={post.id} post={post} />
    // ));

    content = orderedPostId.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ));
  } else if (postsStatus === 'failed') {
    content = <p>{error}</p>
  }

  return (
    <section className="posts-list">
      <h2>Posts ({postCount})</h2>
      {content}
    </section>
  );
};

// export default React.memo(PostsList);
export default PostsList;
