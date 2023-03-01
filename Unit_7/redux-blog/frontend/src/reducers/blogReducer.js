import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],  
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        addBlog(state, action) {

        },
        removeBlog(state, action) {

        }
    } 
})

export const { setBlogs, addBlog, removeBlog } =  blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const returnedPromise = blogService.getAll()
        const returnedBlogs = await returnedPromise
        console.log("Initialized blogs is: ", returnedBlogs)
        dispatch(setBlogs(returnedBlogs))
    }
}

export default blogSlice.reducer