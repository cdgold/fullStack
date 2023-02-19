const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post("/", async (request, response, next) => {
  if(!("title" in request.body) || !("url" in request.body)) {
    return response.status(400).end()
  }
  const body = request.body
  const user = request.user
  try {
    console.log("in blogsRouter.post, user is: ", user)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" })
    }

    let blog = new Blog( { ...body, user: user._id })

    if (blog.likes === undefined) {
      blog.likes = 0
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
  }
  catch (error) {
    next(error)
  }
})

blogsRouter.delete("/:id", async(request, response, next) => {
  try {
    const user = request.user
    const foundBlog = await Blog.findById(request.params.id)
    if(foundBlog.user.toString() !== user.id) {
      return response.status(401).json({ error: "token invalid" })
    }
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  catch(error) {
    next(error)
  }
})

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.json(updatedBlog)
  }
  catch(error) {
    next(error)
  }

})


module.exports = blogsRouter