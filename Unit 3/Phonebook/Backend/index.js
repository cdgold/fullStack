const randomIDMaxValue = 100000

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())

morgan.token('contentBody', function retrieveBody (req, res) {
    if (req.method == "POST") {
        let returnString = JSON.stringify(req.body)
        return returnString
    }
})

app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :contentBody"))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
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

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.json(persons)
    response.status(204).end()
    
})

app.post("/api/persons", (request, response) => {
    let newID = Math.floor(Math.random() * (randomIDMaxValue))
    while (persons.find(person => person.id == newID)) {
        console.log("IDs collided, generating newID.")
        newID = Math.floor(Math.random() * (randomIDMaxValue))
    }
    const requestBody = request.body
    if (requestBody.name && requestBody.number) {
        const matchingPerson = persons.find(person => person.name === requestBody.name || person.number === requestBody.number)
        if (matchingPerson) {
            if (matchingPerson.name === requestBody.name) {
                return response.status(400).json( {
                    error: 'need a unique name'
                })
            }
            else {
                return response.status(400).json( {
                    error: 'need a unique number'
                })
            }
        } else {
            const newPerson = {
                id: newID,
                name: requestBody.name,
                number: requestBody.number,
            }
            persons = persons.concat(newPerson)
            response.json(newPerson)
            console.log("Response.body is", request.body)
            //console.log("R")
        }
    } else {
        return response.status(400).json( {
            error: 'content missing'
        })
    }
    
})

app.get("/info", (request, response) => {
    let currentDate = new Date()
    response.send(`The phonebook has ${persons.length} people. \n ${currentDate}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})