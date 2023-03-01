import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"
import notificationReducer from "./reducers/notificationReducer"
import { configureStore } from "@reduxjs/toolkit"

const combinedStore = configureStore({
    reducer: {
      blogs: blogReducer,
      user: userReducer,
      notification: notificationReducer
    }
})

export default combinedStore