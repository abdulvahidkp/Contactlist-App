import { createSlice } from "@reduxjs/toolkit";
import { addContact } from '../Thunk/contactThunk'


const initialState = {
    contacts: [],
    isLoading: false,
    setErr: ''
}

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {

    },
    extraReducers: {
        [addContact.pending]: (state) => {
            state.isLoading = true
            state.setErr = ''
        },
        [addContact.fulfilled]: (state) => {
            state.isLoading = false
            state.contacts = action.payload.contact
        },
        
    }
})