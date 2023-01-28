//const randomIDMaxValue = 100000

require("dotenv").config()
console.log("dotenv is: ", process.port)
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const Person = require("./models/person")

const app = express()

app.use(cors())

morgan.token("contentBody", function retrieveBody (req, res) {
  if (req.method === "POST") {
    let returnString = JSON.stringify(req.body)
    return returnString
  }
})

app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :contentBody"))
app.use(express.static("build"))

/*
let persons = [
  {
    "id": 1,
    "name": "Arta Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]
*/


app.get("/api/persons", (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
    .catch(error => next(`Error saving persons because ${error}`))
})

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      return response.json(person)
    })
    .catch(error => {
      return response.status(404).end()
    })
  /*
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    */
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      return response.status(202).end()
    })
    .catch(error => next(error))
    /*
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.json(persons)
    response.status(204).end()
    */
})

app.post("/api/persons", (request, response, next) => {
  /*
    let newID = Math.floor(Math.random() * (randomIDMaxValue))
    while (persons.find(person => person.id == newID)) {
        console.log("IDs collided, generating newID.")
        newID = Math.floor(Math.random() * (randomIDMaxValue))
    }
    */
  const requestBody = request.body
  if (requestBody.name && requestBody.number) {
    Person.find({})
      .then(persons => {
        //console.log("Persons is found as: ", persons)
        let matchingPerson = persons.filter(person => person.name === requestBody.name || person.number === requestBody.number)
        //console.log("matchingPerson is: ", matchingPerson)
        return matchingPerson
      }
      ).then(matchingPerson => {
        if (matchingPerson.length === 0) {
          matchingPerson = false
        }
        console.log("Matching person was found: ", matchingPerson)

        if (matchingPerson) {
          console.log("Comparing found name", matchingPerson[0].name)
          console.log("With request name ", requestBody.name)
          if (matchingPerson[0].name === requestBody.name) {
            return response.status(400).json( {
              error: "need a unique name"
            })
          }
          else {
            return response.status(400).json( {
              error: "need a unique number"
            })
          }
        } else {
          const newPerson = new Person({
            name: requestBody.name,
            number: requestBody.number,
          })
          newPerson
            .save()
            .then(result => {
              response.json(newPerson)
              console.log("Response.body is", request.body)
            })
            .catch(error => {
              next(error)
            }
            )
        }
      })
  } else {
    return response.status(400).json( {
      error: "content missing"
    })
  }
})

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body
  console.log("put request arrived with body", body)
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
    .then(updatedPerson => {
      //console.log("Found person to update ", updatedPerson)
      return response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.get("/info", (request, response) => {
  let currentDate = new Date()
  Person.find({}).then(
    persons => {
      response.send(`The phonebook has ${persons.length} people. \n ${currentDate}`)
    }
  )
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})