import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Added a dummy USER URL
const USERS_URL = "https://jsonplaceholder.typicode.com/users";

// we set the initial state to an empty array
const initialState = [];


// fetch new users. 
export const fetchUsers = createAsyncThunk("users/fetchUsers", async() => {
    try {
        const response = await axios.get(USERS_URL);
        console.log("name of users", response.data);
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})
// const initialState = [
//     {id: '0', name: 'Tianna Jenkins'},
//     {id: '1', name: 'Kevin Grant'},
//     {id: '2', name: 'Madison Price'},
// ]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state,action) => {
            console.log("action.payload", action.payload);
            return action.payload;
            // we're returning the action.payload which means it will replace the user
            // list completley.
            // we could use the spread operator to add the new users to the existing list
            // or state.push which would add the new users to the existing list. and
            // immer JS would take care of the immutability for us.
        })
    }

})

export const selectAllUsers = (state) => state.users;
export const selectUserById = (state, userId) => 
    state.users.find((user) => user.id === userId);

export default usersSlice.reducer;