const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)

const Blog = require("../models/blog")

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
}, 1000000)

afterAll(async () => {
  await mongoose.connection.close()
})

test("correct number of blogs returned", async () => {
  const response = await api
    .get("/api/blogs")
  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 1000000)

test("blogs have a unique identifier named 'id'", async () => {
  const response = await api
    .get("/api/blogs")
  expect(response.body[0].id).toBeDefined()
}, 1000000)



// ON 4.10 TEST





afterAll(async () => {
  await mongoose.connection.close()
})