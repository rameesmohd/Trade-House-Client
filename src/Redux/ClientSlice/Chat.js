import { createSlice } from '@reduxjs/toolkit'

export const Chat = createSlice({
    name : 'Chat',
    initialState: {
        selectedChat : null
    },
    reducers:{
        setSelectedChat(state,action){
            state.selectedChat = action.payload
        }
    }
})

export const {setSelectedChat} = Chat.actions
export default Chat.reducer