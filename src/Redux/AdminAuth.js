import { createSlice } from "@reduxjs/toolkit"; 

export const  AdminAuth = createSlice({
    name : 'Admin',
    initialState : {
        Token : null,
        email: '',
        wallet : '0.00'
    },
    reducers : {
        adminLogin(state,action){
            state.Token = action.payload.token
            state.email = action.payload.email
        },
        adminLogout(state,action){
            state.Token = ''
            state.email = ''
        },
        setWalletBalance(state,action){
            state.wallet = action.payload
        }
    }
})

export const {adminLogin,adminLogout,setWalletBalance} = AdminAuth.actions
export default AdminAuth.reducer