const dummy = (blogs) => {
  return 1
}

module.exports = {
  dummy
}

const totalLikes = (blogs) => {
  let returnLikes = blogs.reduce((accumulator, currentBlog) => {
    return currentBlog.likes + accumulator
  }, 0)
  return returnLikes
}

const favoriteBlog = (blogs) => {
  if (Array.isArray(blogs) && blogs.length > 0) {
    console.log("Is array with more than 0.")
    let startingBlog = {
      "title": "No favorite.",
      "author": "No blog had more than zero likes.",
      "likes": 0,
      "url": "Not applicable."
    }
    let bestBlog = blogs.reduce((currentBest, currentBlog) => {
      if (currentBlog.likes > currentBest.likes) {
        console.log(`New best found, ${currentBlog.title} with likes ${currentBlog.likes}`)
        return currentBlog
      }
      else {return currentBest}
    }, startingBlog)
    if (bestBlog.likes === 0) {
      return blogs[0]
    }
    else {return bestBlog}
  }
  else {
    return undefined
  }
}

const mostBlogs = (blogs) => {
  if (Array.isArray(blogs) && blogs.length > 0) {
    let authorCounts = {}
    let finalCounts = blogs.reduce((currentCounts, currentBlog) => {
      if (!(currentBlog.author in currentCounts)) {
        console.log("Creating entry for: ", currentBlog.author)
        currentCounts[currentBlog.author] = 1
      }
      else {
        console.log("Adding one to: ", currentBlog.author)
        currentCounts[currentBlog.author] += 1
      }
      return currentCounts
    }, authorCounts)
    console.log("Final counts ended up being: ", finalCounts)
    let currentMax = 0
    let mostAuthor = ""
    for (let author in finalCounts) {
      if (finalCounts[author] > currentMax) {
        currentMax = finalCounts[author]
        mostAuthor = author
      }
    }
    let answer = {
      author: mostAuthor,
      blogs: currentMax
    }
    console.log("From mostBlog returning: ", answer)
    return answer
  }
  else {
    return undefined
  }
}

const mostLikes = (blogs) => {
  if (Array.isArray(blogs) && blogs.length > 0) {
    let authorCounts = {}
    let finalCounts = blogs.reduce((currentCounts, currentBlog) => {
      if (!(currentBlog.author in currentCounts)) {
        currentCounts[currentBlog.author] = currentBlog.likes
      }
      else {
        currentCounts[currentBlog.author] += currentBlog.likes
      }
      return currentCounts
    }, authorCounts)
    //console.log("Final counts ended up being: ", finalCounts)
    let currentMax = -1
    let mostAuthor = ""
    for (let author in finalCounts) {
      if (finalCounts[author] > currentMax) {
        currentMax = finalCounts[author]
        mostAuthor = author
      }
    }
    let answer = {
      author: mostAuthor,
      likes: currentMax
    }
    console.log("From mostBlog returning: ", answer)
    return answer
  }
  else {
    return undefined
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
