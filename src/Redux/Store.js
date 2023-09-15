import  storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'
import {persistStore,persistReducer} from 'redux-persist'
import {ClientAuth} from './ClientAuth'
import {AdminAuth} from './AdminAuth'
import {TutorAuth} from './TutorAuth'
import {Courses} from './TutorSlice/Courses'
import {CourseOnPayment} from './ClientSlice/CourseOnPayment' 

const persistConfig = { key : 'Client',storage,version : 1}
const userPersistReducer = persistReducer(persistConfig,ClientAuth.reducer)

const adminpersistConfig = {key : 'Admin',storage ,version : 1}
const adminPersistorReducer = persistReducer(adminpersistConfig,AdminAuth.reducer)

const tutorpersistConfig = {key : 'Tutor',storage ,version : 1}
const tutorPersistorReducer = persistReducer(tutorpersistConfig,TutorAuth.reducer)

const CourseOnPaymentpersistConfig = {key : 'CourseOnPayment',storage ,version : 1}
const CourseOnPaymentReducer = persistReducer(CourseOnPaymentpersistConfig,CourseOnPayment.reducer)

export const store = configureStore({
    reducer : {
        Client : userPersistReducer,
        Admin : adminPersistorReducer,
        Tutor : tutorPersistorReducer,
        Courses : Courses.reducer,
        CourseOnPayment : CourseOnPaymentReducer
    }
})

export const persist = persistStore(store)