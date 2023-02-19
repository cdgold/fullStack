import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({blog, user, incrementLikes, deleteBlog}) => {
  let [visibility, setVisibility] = useState(false)
  
  const showWhenVisible = { display: visibility ? '' : 'none' }
  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showIfMatchingUser = { display: user.username === blog.user.username ? '' : 'none'}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div className="blog" style={blogStyle}>
    <div>
      {blog.title} by {blog.author}
      <button style={hideWhenVisible} className="viewButton" onClick={() => setVisibility(true)}>view</button>
      <button style={showWhenVisible} className="hideButton" onClick={() => setVisibility(false)}>hide</button>

    </div>
    <div className="blogExtraContent" style={showWhenVisible}>
      {blog.url} 
      <br></br>
      likes: {blog.likes} <button className="likeButton" onClick={() => incrementLikes(blog)}>like</button>
      <br></br>
      {blog.author} 
      <br></br>
      <button style={showIfMatchingUser} className="removeButton" onClick={() => deleteBlog(blog)}>remove</button>
     </div>  
  </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog