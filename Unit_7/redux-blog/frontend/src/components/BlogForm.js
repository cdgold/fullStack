import { useState } from 'react'
import { Button } from "@mui/material"

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
  
  
    const addBlog = (event) => {
      event.preventDefault()
      const blogToCreate = {
        title: title,
        author: author,
        url: url,
        likes: 0
      }
      console.log("In addBlog, blogToCreate is:")
      createBlog(blogToCreate)
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  
    return (
       <div>
        <h2>Create a new blog</h2>
  
        <form onSubmit={addBlog}>
          <>title <input value={title}
              type="text"
              id="newBlogTitle"
              onChange={event => setTitle(event.target.value)}></input></>
          <br></br>
          <>author <input value={author}
              type="text"
              id="newBlogAuthor"
              onChange={event => setAuthor(event.target.value)}></input></>
          <br></br>
          <>url <input value={url}
            type="text"
            id="newBlogUrl"
            onChange={event => setUrl(event.target.value)}></input></>
          <br></br>
            <Button type="submit" value="Submit" id="createBlogButton" variant="contained" color="primary" > create </Button>
        <br></br>
        </form>
      </div>
    )
  }

export default BlogForm