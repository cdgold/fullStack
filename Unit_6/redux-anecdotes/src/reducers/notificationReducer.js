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

export const newNotification = (message, length=5) => {
  const adjustedLength = length*1000
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, adjustedLength)
  }
}

export default notificationReducer.reducer