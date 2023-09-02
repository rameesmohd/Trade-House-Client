import { createSlice } from '@reduxjs/toolkit'

export const Courses = createSlice({
    name : 'Courses',
    initialState: {
            myCourses : null
    },
    reducers:{
        saveMyCourse(state,action){
            state.myCourses = action.payload
        },
        emptyMyCourse(state,action){
            state.myCourses = null
        }
    }
})

export const {saveMyCourse,emptyMyCourse} = Courses.actions
export default Courses.reducer