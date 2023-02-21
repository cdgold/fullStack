import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

const notificationReducer = createSlice({
    name: "anecdotes",
    initialState,
    reducers: {
      setNotification(state, action) {
        const notification = action.payload
        return notification
      },
      removeNotification(state, action) {
        return initialState
      }
    }
})

export const { setNotification, removeNotification } = notificationReducer.actions
export default notificationReducer.reducer