const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")
const { nonExistingId } = require("../tests/test_helper")

usersRouter.get("/", async (request, response) => {
  const users = await (await User.find({}).populate("blogs", { url: 1, title: 1, author: 1 }))

  response.json(users)
})

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body

  if (typeof (username) !== "string" || username.length < 3) {
    return response.status(400).json({
      error: "username must be a string of at least three characters"
    })
  }

  if (typeof (password) !== "string" || password.length < 3) {
    return response.status(400).json({
      error: "password must be a string of at least three characters"
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  try {
    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  }
  catch (error) {
    next(error)
  }
})

module.exports = usersRouter