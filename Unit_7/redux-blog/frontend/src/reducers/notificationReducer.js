import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: "notification",
    initialState: {message:"", error:""},  
    reducers: {
        setMessage(state, action) {
            const newState = { ...state, message:action.payload }
            return newState
        },
        setErrorMessage(state, action) {
            const newState = { ...state, error:action.payload }
            return newState
        }
    } 
})

export const { setMessage, setErrorMessage } =  notificationSlice.actions

export const setTimedError = (error) => {

}

export default notificationSlice.reducer