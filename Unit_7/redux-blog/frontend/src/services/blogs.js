import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postBlog = (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, newBlog, config)
  return request
}

const postComment = ({comment, id}) => {
  const commentUrl = baseUrl + "/" + id + "/comments"
  console.log("Comment url is: ", commentUrl)
  const request = axios.post(commentUrl, { comment:comment })
  return request
}


const putBlog = (newBlog) => {
  const blogRequest = {
    user: newBlog.user.id,
    likes: newBlog.likes,
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url
  }
  console.log("Put request received with blog ", blogRequest)
  const fixBlogUrl = baseUrl + "/" + newBlog.id
  console.log("Putting at url: ", fixBlogUrl)
  const request = axios.put(fixBlogUrl, blogRequest)
  return request
}

const deleteBlog = (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const fixBlogUrl = baseUrl + "/" + blog.id
  const request = axios.delete(fixBlogUrl, config)
  return request
}

export default { 
  getAll,
  postBlog,
  putBlog,
  deleteBlog,
  setToken,
  postComment
 }