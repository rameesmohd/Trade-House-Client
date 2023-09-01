import { configureStore } from '@reduxjs/toolkit'
import {persistStore,persistReducer} from 'redux-persist'
import  storage from 'redux-persist/lib/storage'
import {ClientAuth} from './ClientAuth'
import {AdminAuth} from './AdminAuth'
import {TutorAuth} from './TutorAuth'

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

const tutorpersistConfig = {
    key : 'Tutor',
    storage ,
    version : 1
}

const userPersistReducer = persistReducer(persistConfig,ClientAuth.reducer)
const adminPersistorReducer = persistReducer(adminpersistConfig,AdminAuth.reducer)
const tutorPersistorReducer = persistReducer(tutorpersistConfig,TutorAuth.reducer)


export const store = configureStore({
    reducer : {
        Client : userPersistReducer,
        Admin : adminPersistorReducer,
        Tutor : tutorPersistorReducer
    }
})

export const persist = persistStore(store)