const listHelper = require("../utils/list_helper")

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fd",
    title: "The Swag Bag",
    author: "Bobert G. Marlowe",
    url: "http://swagbag.org/",
    likes: 2,
    __v: 0
  }
]

test("dummy returns one", () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
  ]

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  const listWithThreeBlogs = [
    blogs[0],
    blogs[1],
    blogs[2]
  ]

  test("when list has three blogs, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithThreeBlogs)
    expect(result).toBe(24)
  })

  const listWithZeroLikesBlog = [
    blogs[0],
    blogs[4]
  ]

  test("when list has blog with zero likes, no likes are added to total", () => {
    const result = listHelper.totalLikes(listWithZeroLikesBlog)
    expect(result).toBe(7)
  })

  const emptyArray = []

  test("when list has no blogs, equals zero", () => {
    const result = listHelper.totalLikes(emptyArray)
    expect(result).toBe(0)
  })
})

describe("favorite blog", () => {
  let listWithOneBlog = [
    blogs[0]
  ]

  test("when list has only one blog, returns that blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(blogs[0])
  })

  const listWithThreeBlogs = [
    blogs[0],
    blogs[1],
    blogs[2]
  ]

  test("when list has three blogs, returns blog with highest likes", () => {
    const result = listHelper.favoriteBlog(listWithThreeBlogs)
    expect(result).toEqual(blogs[2])
  })

  const listWithZeroLikesBlog = [
    blogs[4]
  ]

  test("when list has only blogs with zero likes, returns that blog", () => {
    const result = listHelper.favoriteBlog(listWithZeroLikesBlog)
    expect(result).toEqual(blogs[4])
  })

  const listWithSameLikesBlogs = [
    blogs[5],
    blogs[6]
  ]

  test("when tie for first, returns first of the two", () => {
    const result = listHelper.favoriteBlog(listWithSameLikesBlogs)
    expect(result).toEqual(blogs[5])
  })

  const emptyArray = []

  test("when list has no blogs, returns undefined", () => {
    const result = listHelper.favoriteBlog(emptyArray)
    expect(result).toEqual(undefined)
  })
})

describe("most blogs", () => {
  let listWithOneBlog = [
    blogs[0]
  ]

  let oneBlogAnswer = {
    author: blogs[0].author,
    blogs: 1
  }

  test("when list has only one blog, returns that author with count of one", () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(oneBlogAnswer)
  })

  const listWithTwoAuthors = [
    blogs[0],
    blogs[1],
    blogs[2],
    blogs[3],
    blogs[4],
    blogs[5]
  ]

  const twoAuthorsAnswer = {
    author: blogs[3].author,
    blogs: 3
  }

  test("when list of blogs has multiple authors, returns author with most", () => {
    const result = listHelper.mostBlogs(listWithTwoAuthors)
    expect(result).toEqual(twoAuthorsAnswer)
  })

  const listWithTiedAuthors = [
    blogs[1],
    blogs[2],
    blogs[3],
    blogs[4]
  ]

  const tiedAuthorsAnswer = {
    author: blogs[1].author,
    blogs: 2
  }

  test("when list of blogs has two authors, returns first author", () => {
    const result = listHelper.mostBlogs(listWithTiedAuthors)
    expect(result).toEqual(tiedAuthorsAnswer)
  })


  const emptyArray = []

  test("when list has no blogs, returns undefined", () => {
    const result = listHelper.mostBlogs(emptyArray)
    expect(result).toEqual(undefined)
  })
})

describe("most likes", () => {
  let listWithOneBlog = [
    blogs[0]
  ]

  let oneBlogAnswer = {
    author: blogs[0].author,
    likes: blogs[0].likes
  }

  test("when list has only one blog, returns number of likes it has", () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(oneBlogAnswer)
  })

  const listWithManyAuthors = [
    blogs[0],
    blogs[1],
    blogs[2],
    blogs[3],
    blogs[4],
    blogs[5]
  ]

  const manyAuthorsAnswer = {
    author: blogs[1].author,
    likes: 17
  }

  test("when list of blogs has multiple authors, returns author with most likes", () => {
    const result = listHelper.mostLikes(listWithManyAuthors)
    expect(result).toEqual(manyAuthorsAnswer)
  })

  const listWithTiedAuthors = [
    blogs[2],
    blogs[3],
    blogs[5]
  ]

  const tiedAuthorsAnswer = {
    author: blogs[2].author,
    likes: 12
  }

  test("when list of blogs has tied number of likes authors, returns first author", () => {
    const result = listHelper.mostLikes(listWithTiedAuthors)
    expect(result).toEqual(tiedAuthorsAnswer)
  })


  const emptyArray = []

  test("when list has no blogs, returns undefined", () => {
    const result = listHelper.mostLikes(emptyArray)
    expect(result).toEqual(undefined)
  })
})