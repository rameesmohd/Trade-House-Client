import { configureStore } from '@reduxjs/toolkit'
import {ClientAuth} from './ClientAuth'
import {persistStore,persistReducer} from 'redux-persist'
import  storage from 'redux-persist/lib/storage'

const persistConfig = {
    key : 'Client',
    storage,
    version : 1
}

const userPersistReducer = persistReducer(persistConfig,ClientAuth.reducer)

export const store = configureStore({
    reducer : {
        Client : userPersistReducer,
    }
})

export const persist = persistStore(store)