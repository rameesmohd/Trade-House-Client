import { createSlice } from '@reduxjs/toolkit'

export const ClientAuth = createSlice({
    name : 'Client',
    initialState: {
        Token : null,
        email: "",
        name : "",
        is_requested : false
    },
    reducers:{
        clientLogin(state, action){
            state.Token = action.payload.token
            state.name = action.payload.name
            state.email = action.payload.email
            state.is_requested = action.payload.is_requested
        },
        clientLogout(state, action){
            state.Token = ""
            state.name = {}
            state.email = ""
        },
        tutorReqSubmit(state,action){
            state.is_requested = true
        }
    }
})

export const {clientLogin,clientLogout,tutorReqSubmit} = ClientAuth.actions
export default ClientAuth.reducer