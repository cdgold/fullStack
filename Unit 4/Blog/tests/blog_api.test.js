const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const bcrypt = require("bcrypt")

const Blog = require("../models/blog")
const User = require("../models/user")

describe("When there are initially two blog posts in db", () => {
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
  }, 10000)

  test("correct number of blogs returned", async () => {
    const response = await api
      .get("/api/blogs")
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 10000)

  test("blogs have a unique identifier named 'id'", async () => {
    const response = await api
      .get("/api/blogs")
    expect(response.body[0].id).toBeDefined()
  }, 10000)

  test("returns 400 bad request when posting blog with no title, doesnt post", async () => {
    const newBlog = {
      author: "Waga Baga",
      url: "www.netflix.com/view/?wq2j",
      likes: 2
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    const foundBlog = blogsAtEnd.find(blog => {
      if (blog.author === "Waga Baga") {
        return blog
      }
    })
    expect(foundBlog).toBeUndefined
  })

  test("returns 400 bad request when posting blog with no url, doesnt post", async () => {
    const newBlog = {
      title: "What It Means to be Human",
      author: "Winga Wongus",
      likes: 2
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    const foundBlog = blogsAtEnd.find(blog => {
      if (blog.author === "Winga Wongus") {
        return blog
      }
    })
    expect(foundBlog).toBeUndefined
  })

  test("can update like counts for individual blog posts", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = { ...blogToUpdate, likes: 350 }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const likes = blogsAtEnd.map(blog => blog.likes)
    expect(likes).toContain(350)
    expect(likes).not.toContain(blogToUpdate.likes)
  })
})


describe("when a user is logged in, two starting blogs", () => {

  beforeAll(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash("sekret", 10)
    const firstUser = new User({ username: "root", passwordHash })

    await firstUser.save()

  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test("POST request to /api/blogs creates new blog post", async () => {
    const users = await helper.usersInDb()
    const rootUser = users[0]

    const newBlog = {
      title: "How to Lose a Guy in 10 Days",
      author: "Paul Rudd",
      url: "www.netflix.com/view/?wq2j",
      likes: 29,
      userId: rootUser.id
    }

    const tokenRequest = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" })

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${tokenRequest.body.token}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const blogTitles = blogsAtEnd.map(blog => blog.title)

    expect(blogTitles).toContain(
      "How to Lose a Guy in 10 Days"
    )
  })

  test("can delete individual blog posts (dependent on being able to post)", async () => {
    const users = await helper.usersInDb()
    const rootUser = users[0]

    const blogToDelete = {
      title: "How to Lose a Guy in 10 Days",
      author: "Paul Rudd",
      url: "www.netflix.com/view/?wq2j",
      likes: 29,
      userId: rootUser.id
    }

    const tokenRequest = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" })

    const postedBlogResponse = await api
      .post("/api/blogs")
      .send(blogToDelete)
      .set("Authorization", `bearer ${tokenRequest.body.token}`)

    await api
      .delete(`/api/blogs/${postedBlogResponse.body.id}`)
      .set("Authorization", `bearer ${tokenRequest.body.token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test("number of likes on new post defaults to zero", async () => {
    const users = await helper.usersInDb()
    const rootUser = users[0]

    const newBlog = {
      title: "How to Lose a Guy in 10 Days",
      author: "Paul Rudd",
      url: "www.netflix.com/view/?wq2j",
      userId: rootUser.id
    }

    const tokenRequest = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" })

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${tokenRequest.body.token}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const foundBlog = blogsAtEnd.find(blog => {
      if (blog.title === "How to Lose a Guy in 10 Days") {
        return blog
      }
    })
    expect(foundBlog.likes).toBeDefined()
    expect(foundBlog.likes).toBe(0)
  })

  test("unauthorized when posting without token", async () => {
    const users = await helper.usersInDb()
    const rootUser = users[0]

    const newBlog = {
      title: "How to Lose a Guy in 10 Days",
      author: "Paul Rudd",
      url: "www.netflix.com/view/?wq2j",
      userId: rootUser.id
    }


    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer badToken`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(newBlog.title)
  })

})


describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash("sekret", 10)
    const firstUser = new User({ username: "root", passwordHash })

    await firstUser.save()
  })

  test("returns 400 bad request when username is invalid", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "2c",
      name: "two characters",
      password: "jqwoeirj"
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("username must be a string of at least three characters")
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }), 10000

  test("returns 400 bad request when password is invalid", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "rogerdoger",
      name: "short password",
      password: "2e"
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("password must be a string of at least three characters")
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 10000)

  test("cannot create user with existing username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "root",
      name: "new root",
      password: "pojpaojwerpoj"
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)


    expect(result.body.error).toContain("expected `username` to be unique")
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 10000)

})

afterAll(async () => {
  await mongoose.connection.close()
})