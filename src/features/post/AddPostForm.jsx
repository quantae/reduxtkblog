import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { postAdded } from "./postsSlice";
import {addNewPost} from './postsSlice';
import { selectAllUsers } from "../users/usersSlice";

import React from "react";
import { set } from "date-fns";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  const dispatch = useDispatch();

  const onTitleChanged = (event) => setTitle(event.target.value);
  const onContentChanged = (event) => setContent(event.target.value);
  const onAuthorChanged = (event) => setUserId(event.target.value);

    // Enable the form button based on whether the title and content and userId
  // fields are empty or not.
  // const canSave = Boolean(title) && Boolean(content) && Boolean(userId);
  const canSave = [title, content,userId].every(Boolean) && addRequestStatus === 'idle';

  // const onSavePostClicked = (event) => {
  //   event.preventDefault();
  //   if (title && content) {
  //     dispatch(postAdded(title, content, userId));
  //     setTitle(""); // clears title and content fields to empty
  //     setContent("");
  //   } // end if statement
  // }; // end onSavePostClicked
  const onSavePostClicked = () => {
    if (canSave) {
     try {
      setAddRequestStatus('pending');
      dispatch(addNewPost({title, body: content, userId})).unwrap()

      setTitle('');
      setContent('');
      setUserId('');

     } catch (err) {
      console.log("Failed to save post: ", err)
     } finally {
      setAddRequestStatus('idle');
     }
    }
  }// end onSavePostClicked



  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value="">choose author</option>
          {userOptions}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />

        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
