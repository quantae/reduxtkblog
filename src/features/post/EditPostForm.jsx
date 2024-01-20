import React from 'react'
import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectPostById, updatePost, deletePost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

const PostEdit = () => {
  const {postId} = useParams()
  const navigate = useNavigate()


  const post = useSelector(state => selectPostById(state, Number(postId)))
  const users = useSelector(selectAllUsers)

  // we create a state and initialize it to the post title. 
  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.body)
  const [userId, setUserId] = useState(post?.userId)  
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch()


  // this check as to be after all the hooks and variables are declared
  // else we shall get an error. 
if (!post) {
  return (
    <section>
      <h2>Post not found!</h2>
    </section>
  )
} // end of if statement

// We create function to handle the changes in the title, content etc
const onTitleChange = e => setTitle(e.target.value)
const onContentChange = e => setContent(e.target.value)
const onAuthorChange = e => setUserId(Number(e.target.value))

// We create a function to handle the save button
const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

// save the post
const onSavePostClicked = () => {
  if (canSave) {
    try {
      setRequestStatus('pending');
      dispatch(updatePost({id: post.id, title, body: content, userId, reactions: post.reactions})).unwrap();

      // set the input fields to empty
      setTitle('');
      setContent('');
      setUserId('');
  
      navigate(`/posts/${postId}`)
    } catch (err) {
      console.log("Failed to save post: ", err)
    } finally {
      setRequestStatus('idle');
    }
  }
}

// user options. 
const userOptions = users.map(user => (
  <option key={user.id} value={user.id}>
    {user.name}
  </option>
))

// onDeletePost
const onDeletePostClicked = () => {
  try {
    setRequestStatus('pending');
    dispatch(deletePost({id: post.id})).unwrap();

    setTitle('');
    setContent('');
    setUserId('');
    navigate('/')
  } catch (err) {
    console.error("Failed to delete post: ", err)
  } finally {
    setRequestStatus('idle');
  }
}

  return (
    <section>
      <Link to='/posts'>Go back to posts</Link>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" defaultValue={userId} onChange={onAuthorChange}>
          <option value="">choose author</option>
          {userOptions}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />

        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        
        <button type="button" onClick={onDeletePostClicked} disabled={!canSave}>
          Delete Post
        </button>
      </form>
    </section>
  )
}

export default PostEdit
