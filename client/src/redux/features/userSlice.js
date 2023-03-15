import { createSlice } from "@reduxjs/toolkit";
import { signup, signin } from "../Thunk/userThunk";
import jwtDecode from 'jwt-decode'

export const checkIfUserLoggedIn = () => {

    const token = localStorage.getItem('user');
    if (!token) return false;
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('user');
        return false;
    }
    return true;
};

const initialState = {
    isLogged: checkIfUserLoggedIn(),
    username: '',
    email: '',
    login: {
        err: '',
        isLoading: false
    }
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogout: (state, action) => {
            localStorage.removeItem('user')
            state.email = ''
            state.username = ''
            state.isLogged = false
        },
        removeErr: (state) => {
            state.login.err = ''
        }
    },
    extraReducers: {
        [signup.pending]: (state) => {
            state.login.isLoading = true
            state.login.err = ''
        },
        [signup.fulfilled]: (state, action) => {
            console.log('fullfiled', action.payload);

            state.login.isLoading = false
            state.isLogged = true
            state.username = action.payload.username
            state.email = action.payload.email
            localStorage.setItem('user', action.payload.accessToken)
        },
        [signup.rejected]: (state, action) => {
            state.login.isLoading = false
            state.login.err = action.payload
        },
        [signin.pending]: (state) => {
            state.login.isLoading = true;
            state.login.err = ''
        },
        [signin.fulfilled]: (state, action) => {
            state.login.isLoading = false
            state.isLogged = true
            state.username = action.payload.username
            state.email = action.payload.email
            localStorage.setItem('user', action.payload.accessToken)
        },
        [signin.rejected]: (state, action) => {
            state.login.isLoading = false
            state.login.err = action.payload
        },
    }
})

export const { userLogout, removeErr } = userSlice.actions;
export default userSlice.reducer;

export const userState = state => state.user


