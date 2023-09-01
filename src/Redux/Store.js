import { configureStore } from '@reduxjs/toolkit'
import {persistStore,persistReducer} from 'redux-persist'
import  storage from 'redux-persist/lib/storage'
import {ClientAuth} from './ClientAuth'
import { AdminAuth } from './AdminAuth'

const persistConfig = {
    key : 'Client',
    storage,
    version : 1
}
const adminpersistConfig = {
    key : 'Admin',
    storage ,
    version : 1
}

const userPersistReducer = persistReducer(persistConfig,ClientAuth.reducer)
const adminPersistorReducer = persistReducer(adminpersistConfig,AdminAuth.reducer)

export const store = configureStore({
    reducer : {
        Client : userPersistReducer,
        Admin : adminPersistorReducer
    }
})

export const persist = persistStore(store)