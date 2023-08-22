import { createSlice } from '@reduxjs/toolkit'

export const ClientAuth = createSlice({
    name : 'Client',
    initialState: {
        Token : null,
        email: "",
        name : ""
    },
    reducers:{
        clientLogin(state, action){
            state.Token = action.payload.token
            state.name = action.payload.name
            state.email = action.payload.email
        },
        clientLogout(state, action){
            state.Token = "",
            state.name = {}
            state.email = ""
        }
    }
})

export const {clientLogin,clientLogout} = ClientAuth.actions
export default ClientAuth.reducer