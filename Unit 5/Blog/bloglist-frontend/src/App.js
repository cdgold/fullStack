import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from "./services/login"


const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

const Notification = ( {message} ) => {
  const messageStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null || message === "") {
    return null
  }
  else {
    return (
      <div style = {messageStyle}>
        {message}
      </div>
    )
  }
}

const ErrorNotification = ( {message} ) => {
  const messageStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null || message === "") {
    return null
  }
  else {
    return (
      <div className="error" style = {messageStyle}>
        {message}
      </div>
    )
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null) 
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")


  const handleLogin = async (event) => {
    event.preventDefault()

      try {
        const user = await loginService.login({
          username, password,
        })
        
        blogService.setToken(user.token)
        window.localStorage.setItem("loggedBlogUser", JSON.stringify(user))
        setUser(user)
        setUsername('')
        setPassword('')
      } catch (exception) {
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    blogService.setToken(null) 
    setUser(null)
  }
    
  const createBlog = ( newBlog ) => {
    console.log("(in app.js) New blog being created by ", user)
    console.log("(in app.js) Attempting create with blog: ", newBlog)
    blogService.postBlog(newBlog)
      .then(result => {
        console.log("Result is: ", result)
        const showBlog = { ...result.data, user:user }
        const newBlogs = blogs.concat(showBlog)
        setMessage(`Added blog: ${showBlog.title} by ${showBlog.author}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000) 
        setBlogs(newBlogs)
      }
      )
      .catch(error => {
        setErrorMessage("Error posting new blog: ", error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  
  const compareLikes = (firstBlog, secondBlog) => {
    if (firstBlog.likes < secondBlog.likes) {
      return 1
    } 
    else if (firstBlog.likes > secondBlog.likes) {
      return -1
    } 
    else {
      return 0
    }
}

  const incrementLikes = (blog) => {
    console.log("Incrementing likes for blog: ", blog)
    const newLikes = blog.likes + 1
    const fixedBlog = { ...blog, likes:newLikes }
    blogService.putBlog(fixedBlog)
      .then(
        result => {
          console.log("Likes incremented for blog ", blog)
          const blogsMinusOldBlog = blogs.filter(blogItr => blogItr.title !== blog.title)
          const updatedBlogs = blogsMinusOldBlog.concat(fixedBlog)
          const sortedBlogs = updatedBlogs.sort(compareLikes)
          setBlogs(sortedBlogs)
        }
      )
     .catch(
      error => {
        setErrorMessage(`Error incrementing likes for blog ${blog.title} was ${error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }

     )
  }

  const deleteBlog = (blog) => {
    if(window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author}?`)) {
      console.log("deleting blog in app.js")
      blogService.deleteBlog(blog)
        .then( result => {
          const blogsMinusRemoved = blogs.filter(blogItr => blogItr.title !== blog.title)
          setBlogs(blogsMinusRemoved)
          setMessage(`Removed blog: ${blog.title}`)
          }
        )
        .catch (
          error =>  {
            setErrorMessage(`Error deleting blog ${blog.title} was ${error}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }
        )
    }
  }

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        const sortedBlogs = blogs.sort(compareLikes)
        setBlogs( sortedBlogs )
      }
      )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <ErrorNotification message={errorMessage} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
      </div>
    )
  }
  return (
    <div>
      <Notification message={message} />
      <ErrorNotification message={errorMessage} />
      <div>
        <h2>blogs</h2>
        <> {user.name} logged in </> <button onClick={() => logout()}>logout</button>
      </div>
    <div>  
      <Togglable buttonLabel="new blog">
        <BlogForm createBlog = {createBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} incrementLikes={incrementLikes} deleteBlog={deleteBlog} />
      )}
    </div>
  </div>
  )
}

export default App