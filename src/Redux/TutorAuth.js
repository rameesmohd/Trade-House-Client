import { createSlice } from '@reduxjs/toolkit'

export const TutorAuth = createSlice({
    name : 'Tutor',
    initialState: {
        Token : null
    },
    reducers:{
        tutorLogin(state,action){
            state.Token = action.payload.token
        },
        tutorLogout(state,action){
            state.Token = null
        }
    }
})

export const {tutorLogin,tutorLogout} = TutorAuth.actions
export default TutorAuth.reducer