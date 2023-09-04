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
        },
        addCourse(state, action) {
            state.myCourses = [...state.myCourses, action.payload];
            console.log('in redux',action.payload);
        }
    }
})

export const {saveMyCourse,emptyMyCourse,addCourse} = Courses.actions
export default Courses.reducer