import { createSlice } from "@reduxjs/toolkit";
import { addContact,getContacts,editContact } from '../Thunk/contactThunk'


const initialState = {
    contacts: [],
    isLoading: false,
    setErr: ''
}

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        clearContacts:(state,action) => {
            state.contacts = []
        },
        removeErr:(state)=>{
            state.setErr = ''
        },
        deleteContact:(state,action) => {
            state.contacts = state.contacts.filter(per=>per.number.toString() !== action.payload.toString())
        }
    },
    extraReducers: {
        [getContacts.pending]: (state) => {
            state.isLoading = true
            state.setErr = ''
        },
        [getContacts.fulfilled]: (state, action) => {
            state.isLoading = false
            console.log('action.paloads:',action.payload);
            state.contacts = action.payload ?? []
            state.contacts.sort((a, b) => a.name.localeCompare(b.name)); 
        },
        [getContacts.rejected]: (state, action) => {
            state.isLoading = false
            state.setErr = action.payload
        },
        [addContact.pending]: (state) => {
            state.isLoading = true
            state.setErr = ''
        },
        [addContact.fulfilled]: (state, action) => {
            state.isLoading = false
            state.contacts.push(action.payload)
            state.contacts.sort((a, b) => a.name.localeCompare(b.name));
        },
        [addContact.rejected]: (state, action) => {
            state.isLoading = false
            state.setErr = action.payload.message
        },
        [editContact.pending]: (state) => {
            state.isLoading = true
            state.setErr = ''
        },
        [editContact.fulfilled]: (state, action) => {
            state.isLoading = false
            const oldNum = action.payload.oldNum
            const number = action.payload.editNum
            const name = action.payload.editName
            const email = action.payload.editEmail
            console.log(action.payload);
            state.contacts = state.contacts.map(per=>(per.number.toString() === oldNum.toString() ? {number,name,email} : per))
            state.contacts.sort((a, b) => a.name.localeCompare(b.name));
        },
        [editContact.rejected]: (state, action) => {
            state.isLoading = false
            state.setErr = action.payload.message
        }
    }
})

export default contactSlice.reducer;
export const {clearContacts,removeErr,deleteContact} = contactSlice.actions;
export const contactState = state=>state.contacts