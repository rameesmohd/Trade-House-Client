import { createSlice } from '@reduxjs/toolkit'

export const TutorAuth = createSlice({
    name : 'Tutor',
    initialState: {
        Token : null,
        id : null,
        isBlocked : {}
    },
    reducers:{
        tutorLogin(state,action){
            state.Token = action.payload.token
            state.id = action.payload.id
        },
        tutorLogout(state,action){
            state.Token = null
            state.id = null
        },
        setBlocker(state,action){
            state.isBlocked= action.payload
        }
    }
})

export const {tutorLogin,tutorLogout,setBlocker} = TutorAuth.actions
export default TutorAuth.reducer