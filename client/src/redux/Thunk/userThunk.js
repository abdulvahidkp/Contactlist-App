import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { signupUrl,signinUrl } from "../../api/userUrl/userUrl";

export const signup = createAsyncThunk(
    'user/signup', async (datas, thunkAPI) => {
        try {
            const { data } = await axios.post(signupUrl, datas);
            return data
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)

export const signin = createAsyncThunk(
    'user/signin', async (datas,thunkAPI) => {
        try {
            const { data } = await axios.post(signinUrl, datas);
            return data
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)