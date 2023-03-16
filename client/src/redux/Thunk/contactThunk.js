import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { contactUrl } from "../../api/userUrl/userUrl";


export const getContacts = createAsyncThunk(
    'contact/getContacts', async (_, thunkAPI) => {
        try {
            const userToken = localStorage.getItem('user');
            const { data } = await axios.get(contactUrl, {
                headers: {
                    Authorization: userToken,
                }
            });
            console.log('data',data);
            return data
        } catch (error) {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)


export const addContact = createAsyncThunk(
    'contact/addContact', async (datas, thunkAPI) => {
        try {
            const userToken = localStorage.getItem('user');
            const { data } = await axios.post(contactUrl, datas, {
                headers: {
                    Authorization: userToken,
                }
            });
            return datas;
        } catch (error) {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)

export const editContact = createAsyncThunk(
    'contact/editContact',async (datas,thunkAPI) => {
        try {
            const userToken = localStorage.getItem('user');
            const { data } = await axios.put(contactUrl, datas, {
                headers: {
                    Authorization: userToken,
                }
            });
            return datas;
        } catch (error) {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)