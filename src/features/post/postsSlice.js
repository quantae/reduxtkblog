import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    userId: "0",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    }
  },
  {
    id: "2",
    title: "Second Post!",
    content: "More text",
    userId: "1",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    }
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
        reducer(state, action) {
        state.push(action.payload)
    },
    prepare(title, content, userId) {
        return {
            payload: {
                id: nanoid(),
                title,
                content,
                date: new Date().toISOString(),
                userId,
                reactions: {
                    thumbsUp: 0,
                    hooray: 0,
                    heart: 0,
                    rocket: 0,
                    eyes: 0,
                }

            }
        }
    }
}, // end of postAdded reducer
reactionAdded(state, action) {
  const {postId, reaction } = action.payload
  const existingPost = state.find(post => post.id === postId)
  if (existingPost){
    existingPost.reactions[reaction]++;
  }
}
  },
});

// create selectors to access the state and export them
export const selectAllPosts = (state) => state.posts;
export const selectAllPostsCount = (state) => state.posts.length;


// action creator functions/reducers
export const { postAdded,reactionAdded, postCount } = postsSlice.actions;

// default reducer export used in store.js
export default postsSlice.reducer;
