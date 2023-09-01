import { createSlice } from "@reduxjs/toolkit"; 

export const  AdminAuth = createSlice({
    name : 'Admin',
    initialState : {
        Token : null,
        email: ''
    },
    reducers : {
        adminLogin(state,action){
            state.Token = action.payload.token
            state.email = action.payload.email
        },
        adminLogout(state,action){
            state.Token = ''
            state.email = ''
        }
    }
})

export const {adminLogin,adminLogout} = AdminAuth.actions
export default AdminAuth.reducer