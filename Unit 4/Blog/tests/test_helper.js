const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "How to Cook the Perfect Risotto",
    author: "John Wilson",
    url: "hba.com/view/sa8h32jk",
    likes: 29
  },
  {
    title: "Talking to Your Mother",
    author: "Ryan Base",
    url: "www.regispd.net/123",
    likes: 10
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}