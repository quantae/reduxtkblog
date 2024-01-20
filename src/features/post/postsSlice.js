import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

// import dummt URL
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.datat)
})

// in using createEntityAdapter, we can remove the posts array from the initial state. New code is below it.
// const initialState = {
//   posts: [],
//   status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null,
//   count: 0,
// };

const initialState = postsAdapter.getInitialState({
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  count: 0,
})

// createAsyncThunk for fetching posts.
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    console.log("posts from api", response.data);
    return [...response.data];
  } catch (err) {
    return err.message;
  }
});

// createAsyncThunk for adding posts.
export const addNewPost = createAsyncThunk(
  "post/addNewPost",
  async (initialPost) => {
    try {
      const response = await axios.post(POSTS_URL, initialPost);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

// createAsyncThunk for updating posts
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

// createAsyncThunk for deleting posts
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${POSTS_URL}/${id}`);
      if (response.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

// createSlice for posts
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
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
            },
          },
        };
      },
    }, // end of postAdded reducer
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      // we also will use the createEntityAdapter to find existing posts
      // const existingPost = state.posts.find((post) => post.id === postId);
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    increaseCount(state, action) {
      state.count = state.count + 1;
    }, // end of reactionAdded reducer
    // updatePost(state, action){
    //   const { id, title, content, userId } = action.payload;
    //   const existingPost = state.posts.find(post => post.id === id);
    //   if (existingPost) {
    //     existingPost.title = title;
    //     existingPost.content = content;
    //     existingPost.userId = userId;
    //   }
    // }, // end of updatePost reducer
  }, // end of reducers
  // extraReducers are swicth cases that were not defined insde the normal reducers.
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions to the post
        let min = 1;

        // Because the API doesn't return the date or reactions for a post,
        // we'll generate random values for those fields
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          };
          return post;
        }); // end of loadedPosts map
        // Add my fetched posts to the array
        // state.posts = state.posts.concat(loadedPosts);
        //state.posts = loadedPosts;
        // the adapter its own crud methods so instead of state.posts = loadedPosts, 
        // we can use the addMany method from the adapter.
        postsAdapter.upsertMany(state, loadedPosts)
      }) // end of fullfilled case

      // rejected case
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }) // end of rejected case.

      // addNewPost case
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        };
        console.log("action.payload", action.payload);
        // the push methods also has its own methods in the adapter.
        // we make use of that.
        // state.posts.push(action.payload);
        postsAdapter.addOne(state, action.payload);

      }) // end of addNewPost.fulfilled case

      // updatepost case
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log(" update could not be completed");
          console.log("action.payload: editPost", action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();

        const posts = state.posts.filter((post) => post.id !== id);
        // repalce the spread code below with the adapter method.
        // state.posts = [...posts, action.payload];
        postsAdapter.upsertOne(state, action.payload);
      }) // end of updatePost.fulfilled case.

      // deletePost case
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("delete could not be completed");
          console.log("action.payload: deletePost", action.payload);
          return;
        }
        const { id } = action.payload;
        //const posts = state.posts.filter((post) => post.id !== id);
        // replace this with the adapter's method of removing one.
        // state.posts = posts;
        postsAdapter.removeOne(state, id);
      });
  }, // end of extraReducers
});


// we replace some of the selectors and use es6 destructuring to give the alliaces so that they match our existing code. 

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // you do have to pass in a post selector that returns the posts slice of state
} = postsAdapter.getSelectors((state) => state.posts);

// create selectors to access the state and export them
// export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
// export const selectPostById = (state, postId) =>
//   state.posts.posts.find((post) => post.id === postId);

/**
 * In optimizing the re-rendering of the posts list, we can use the createSelector
 * function from the reselect library to create a memoized selector that will only return a new array of posts if the posts array or the value of the selected user ID changes.
 */
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

// export const selectAllPostsCount = (state) => state.posts.posts.length;
export const selectAllPostsCount = (state) => null;
export const getCount = (state) => state.posts.count;

// action creator functions/reducers
export const { increaseCount, postAdded, reactionAdded, postCount } =
  postsSlice.actions;

// default reducer export used in store.js
export default postsSlice.reducer;
