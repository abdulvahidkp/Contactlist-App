import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { contactUrl } from "../../api/userUrl/userUrl";

export const addContact = createAsyncThunk(
    'contact/addContact', async (datas, thunkAPI) => {
        try {
            const userToken = localStorage.getItem('user');
            const { data } = await axios.post(contactUrl, datas, {
                headers: {
                    Authorization: userToken,
                }
            });
            return data;
        } catch (error) {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)