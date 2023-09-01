import { createSlice } from '@reduxjs/toolkit'

export const TutorAuth = createSlice({
    name : 'Tutor',
    initialState: {
        Token : null,
        email: ""
    },
    reducers:{
    }
})

export const {clientLogin,clientLogout,tutorReqSubmit} = ClientAuth.actions
export default ClientAuth.reducer