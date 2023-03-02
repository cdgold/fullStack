import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({blog, user, incrementLikes, deleteBlog}) => {
  const showIfMatchingUser = { display: user.username === blog.user.username ? '' : 'none'}

  return (
  <div className="blog">
    <h2>
      {blog.title} by {blog.author}
    </h2>
    <div className="blogExtraContent">
      {blog.url} 
      <br></br>
      likes: {blog.likes} <button className="likeButton" onClick={() => incrementLikes(blog)}>like</button>
      <br></br>
      added by {blog.user.name} 
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