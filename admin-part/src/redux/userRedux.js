import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:"user",
    initialState: {
        currentUser: null,
        users:[],
        isFetching: false,
        error: false,
    },
    reducers: {
        //LOGIN
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess:(state, action) => {
            state.isFetching = false;
            state.error = false;
            state.currentUser = action.payload;
        },
        loginFailure:(state) => {
            state.isFetching = false;
            state.error = true;
        },
        //GET ALL
        getUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users = action.payload;
        },
        getUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //DELETE
        deleteUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users.splice(
                state.users.findIndex(item => item._id === action.payload),
                1
            );
        },
        deleteUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //UPDATE
        updateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users[
                state.users.findIndex(item => item._id === action.payload)
            ] = action.payload.user;
        },
        updateUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //ADD
        addUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users.push(action.payload);
        },
        addUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {  loginStart, loginSuccess, loginFailure,
                getUsersStart, getUsersSuccess, getUsersFailure,
                addUserStart, addUserSuccess, addUserFailure,
                updateUserStart, updateUserSuccess, updateUserFailure,
                deleteUserStart, deleteUserSuccess, deleteUserFailure
            } = userSlice.actions;
export default userSlice.reducer;