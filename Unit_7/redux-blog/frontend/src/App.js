import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from "./components/Notification"
import ErrorNotification from "./components/ErrorNotification"
import User from "./components/User"
import Users from "./components/Users"
import blogService from './services/blogs'
import loginService from "./services/login"
import userService from "./services/users"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs, setBlogs } from "./reducers/blogReducer"
import { setUser, setAllUsers } from "./reducers/userReducer"
import { setMessage } from "./reducers/notificationReducer"
import { setErrorMessage } from "./reducers/notificationReducer"
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'
import {   Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper, 
  AppBar,
  Toolbar,
  Button,
} from "@mui/material"

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
        <Button onClick={toggleVisibility} color="primary" variant="outlined">{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} color="secondary" variant="outlined">cancel</Button>
      </div>
    </div>
  )
}

const Home = ({blogs, createBlog}) => {
  const blogStyle = {
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return(  
    <div>  
    <Togglable buttonLabel="new blog">
      <BlogForm createBlog = {createBlog}/>
    </Togglable>
      <div>
        <h2> current entries: </h2>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {blogs.map(blog =>
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`} style={blogStyle}> {blog.title} </Link>
                  </TableCell>
                  <TableCell>
                    {blog.author}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>  
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

const Header = () => {
  return(
    <div>
      <Notification />
      <ErrorNotification />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button color="secondary" component={Link} to="/">
            home
          </Button>
          <Button color="secondary" component={Link} to="/users">
            users
          </Button>                        
        </Toolbar>
      </AppBar>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [blogs, users] = useSelector(state => {
    let returnBlogs = []
    if (state.blogs !== undefined){
      const arrayToSort = [...state.blogs]
      const sortedBlogs = arrayToSort.sort((a, b) => {return b.likes - a.likes})
      returnBlogs = sortedBlogs
    }
    return [returnBlogs, state.user]
  })

  const userMatch = useMatch("/users/:id")
  const viewedUser = userMatch
    ? users.allUsers.find(a => a.id === userMatch.params.id)
    : null
  const blogMatch = useMatch("/blogs/:id")
  const viewedBlog = blogMatch
    ? blogs.find(a => a.id === blogMatch.params.id)
    : null

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userResponse = await loginService.login({
        username, password
      })
      console.log("userResponse is: ", userResponse)
      blogService.setToken(userResponse.token)
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(userResponse))
      dispatch(setUser(userResponse))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setErrorMessage('Wrong credentials'))
      setTimeout(() => {
        dispatch(setErrorMessage(null))
      }, 5000)
  }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    blogService.setToken(null) 
    dispatch(setUser(null))
  }
    
  const createBlog = ( newBlog ) => {
    console.log("(in app.js) New blog being created by ", users.user)
    console.log("(in app.js) Attempting create with blog: ", newBlog)
    blogService.postBlog(newBlog)
      .then(result => {
        console.log("Result is: ", result)
        const showBlog = { ...result.data, user:users.user }
        const newBlogs = blogs.concat(showBlog)
        dispatch(setMessage(`Added blog: ${showBlog.title} by ${showBlog.author}`))
        setTimeout(() => {
          dispatch(setMessage(null))
        }, 5000) 
        dispatch(setBlogs(newBlogs))
      }
      )
      .catch(error => {
        dispatch(setErrorMessage("Error posting new blog: ", error))
        setTimeout(() => {
          dispatch(setErrorMessage(null))
        }, 5000)
      })
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
          dispatch(setBlogs(updatedBlogs))
        }
      )
     .catch(
      error => {
        dispatch(setErrorMessage(`Error incrementing likes for blog ${blog.title} was ${error}`))
        setTimeout(() => {
          dispatch(setErrorMessage(null))
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
          dispatch(setBlogs(blogsMinusRemoved))
          dispatch(setMessage(`Removed blog: ${blog.title}`))
          setTimeout(() => {
            dispatch(setMessage(null))
          }, 5000) 
          navigate("/")
          }
        )
        .catch (
          error =>  {
            dispatch(setErrorMessage(`Error deleting blog ${blog.title} was ${error}`))
            setTimeout(() => {
              dispatch(setErrorMessage(null))
            }, 5000)
          }
        )
    }
  }

  const addComment = ({blog, comment}) => {
    console.log("Received blog: ", blog)
    console.log("Received comment: ", comment)
    blogService.postComment({id:blog.id, comment:comment})
      .then(result => {
        const fixedBlog = result.data
        const newBlogs = blogs.map(blog => {
          if (blog.id === fixedBlog.id) {
            return fixedBlog
          }
          return blog
        })
        console.log("New blogs is: ", newBlogs)
        dispatch(setBlogs(newBlogs))
      })
      .catch(error => {
        dispatch(setErrorMessage("Error adding comment: ", error))
        setTimeout(() => {
          dispatch(setErrorMessage(null))
        }, 5000)
      })
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
    async function getUsersAsync() {
      const userList = await userService.getUsers()
      console.log("userList is: ", userList)
      dispatch(setAllUsers(userList))
    }
    getUsersAsync()
  }, [dispatch])

  useEffect(() => {
    if (users.user !== null) {
      dispatch(initializeBlogs())
    }
  }, [dispatch, users.user])


  if (users.user === null) {
    return (
      <Container>
        <div>
          <Notification />
          <ErrorNotification />
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
          <Button type="submit" id="login-button" color="primary" variant="contained">login</Button>
        </form>
        </div>
      </Container>
    )
  }
  return (
    <Container>
        <div>
          <Header />
          <h2>blog app </h2>
          <div>
            <> {users.user.name} logged in </> <Button onClick={() => logout()} color="primary">logout</Button>
          </div>
          <div>
            <Routes>
              <Route path="/users/:id" element={<User user={viewedUser} />} />
              <Route path="/users" element={<Users />} />
              <Route 
                path="/" 
                element={<Home blogs={blogs} createBlog={createBlog} />
                }
              />
              <Route path="/blogs/:id" element={
                <Blog blog={viewedBlog} 
                user={users.user} 
                incrementLikes={incrementLikes} 
                deleteBlog={deleteBlog}
                addComment={addComment}
              />
              } 
              />
            </Routes>
          </div>
      </div>
  </Container>
  )
}

export default App