import { createSlice } from '@reduxjs/toolkit'

export const ClientAuth = createSlice({
    name : 'Client',
    initialState: {
        Token : null,
        email: "",
        name : "",
        user_id: '',
        is_requested : false,
        is_tutor : false
    },
    reducers:{
        clientLogin(state, action){
            state.Token = action.payload.token
            state.name = action.payload.name
            state.email = action.payload.email
            state.user_id = action.payload.user_id
            state.is_requested = action.payload.is_requested
            state.is_tutor = action.payload.is_tutor

        },
        clientLogout(state, action){
            state.Token = ""
            state.name = {}
            state.email = ""
            state.user_id = ""
            state.is_requested=false
            state.is_tutor=false
        },
        tutorReqSubmit(state,action){
            state.is_requested = true
        },
        updateTutorStates(state,action){
            state.is_requested = action.payload.is_requested
            state.is_tutor = action.payload.is_tutor
        }
    }
})

export const {clientLogin,clientLogout,tutorReqSubmit,updateTutorStates} = ClientAuth.actions
export default ClientAuth.reducer