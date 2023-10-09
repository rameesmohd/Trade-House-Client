import { createSlice } from '@reduxjs/toolkit'

export const Chat = createSlice({
    name : 'Chat',
    initialState: {
        selectedChat : null,
        inboxAllChat : [],
    },
    reducers:{
        setSelectedChat(state,action){
            state.selectedChat = action.payload
        },
        setAllInboxData(state,action){
            console.log(action.payload,'setAllInboxData redux');
            state.inboxAllChat = action.payload
        }

    }
})

export const {setSelectedChat,setAllInboxData} = Chat.actions
export default Chat.reducer