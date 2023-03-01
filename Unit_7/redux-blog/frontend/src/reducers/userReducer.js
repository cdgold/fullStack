import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {user:null, allUsers:null},  
    reducers: {
        setUser(state, action) {
            const newState = { ...state, user:action.payload }
            return newState
        },
        setAllUsers(state, action) {
            const newState = { ...state, allUsers:action.payload }
            return newState
        }
    } 
})

export const { setUser, setAllUsers } =  userSlice.actions

export default userSlice.reducer