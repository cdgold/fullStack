import PropTypes from 'prop-types'
import useState from "react"

const Blog = ({blog, user, incrementLikes, deleteBlog, addComment}) => {
  const showIfMatchingUser = { display: user.username === blog.user.username ? '' : 'none'}

  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    console.log("comment is: ",  comment)
    const functionArg = {blog:blog, comment:comment}
    addComment(functionArg)
    event.target.comment.value = ""
  }

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
      <h3>comments</h3>
        <form onSubmit={handleComment}>
          <div>
            <input 
              type="text"
              name="comment"
            />
          </div>
          <button type="submit"> add comment </button>

        </form> 
      <ul>
      {blog.comments.map(comment => {
        return(<li> {comment} </li>)
      })}
      </ul>
     </div>  
  </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog