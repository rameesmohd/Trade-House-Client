import { createSlice } from '@reduxjs/toolkit'

export const TutorAuth = createSlice({
    name : 'Tutor',
    initialState: {
        Token : null,
        id : null
    },
    reducers:{
        tutorLogin(state,action){
            state.Token = action.payload.token
            state.id = action.payload.id
        },
        tutorLogout(state,action){
            state.Token = null
            state.id = null
        }
    }
})

export const {tutorLogin,tutorLogout} = TutorAuth.actions
export default TutorAuth.reducer