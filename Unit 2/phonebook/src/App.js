import numberService from "./services/numbers"
import { useState, useEffect } from 'react'

const Listings = ( { persons, deleteHandler } ) => {
  //console.log("receiving following array: ", persons)
  let people = persons.map((person) => {
    return (
      <div key={person.name}> {person.name} {person.number}  
      <button onClick={() => deleteHandler(person.id)}>delete</button>
      </div>
    )
  }
  )
  return (
    <div>
      {people}
    </div>
  )
}

const Search = (props) => {
  return (
  <div>
    Filtering for: <input value={props.value} onChange={props.onChange}/>
  </div>
  )
}

const AddNumber = (props) => {
  return (
  <form onSubmit={props.addName} >
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange}/>
      </div>
      <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
  </form>
  )
}

const Notification = ( { message } ) => {
  //console.log("Message is: ", message)
  const messageStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null || message === '') {
    return null
  }

  return (
    <div style = {messageStyle}>
      {message}
    </div>
  )
}

const ErrorNotification = ( { message } ) => {
  console.log("Message is: ", message)
  const messageStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null || message === '') {
    return null
  }

  return (
    <div style = {messageStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    let foundName = false;
    let foundPerson;
    persons.forEach(person => {
      if (person.name === newName) {
        foundName = true;
        foundPerson = person
      }
    })
    if (foundName) {
      let response = window.confirm(`${newName} is already in phonebook, did you want to update their number?`)
      if (response) {
        let newPerson = {...foundPerson, number:newNumber}
        numberService.update(newPerson, newPerson.id)
          .then(response => {
            let newPersons = persons.map(person => newPerson.id == person.id ? response : person)
            setPersons(newPersons)
            setMessage(
              `Number changed to '${newPerson.number}' for ${newPerson.name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `${newPerson.name} already deleted.`
              )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
    else {
    const newPerson = {
      name: newName,
      number: newNumber
    }
    
    numberService
      .create(newPerson)
      .then(response => {
        console.log("Create response was: ", response)
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setMessage(
          `New person added (${newPerson.name})`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {console.log("Network error when creating new person, it was: ", error)})
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const deleteHandler = (personID) => {
    numberService.deleteRequest(personID)
      .then(setPersons(persons.filter(person => person.id != personID)))
      .catch(error => {
        setErrorMessage(
          `Person already deleted.`
          )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleSearchChange = (event) => setNewSearch(event.target.value) 

  const personsToShow = () => {
    if (newSearch === '') {
      return persons
    }
    else {
      let returnArray = []
      persons.forEach((person) => {
        if (person.name.includes(newSearch)) {
          console.log("Adding person to search array: ", person.name)
          return(returnArray.push(person))
        }
      }
      )
      console.log("Return array is:", returnArray)
      return returnArray
    }
  }

  useEffect(() => {
    numberService
      .getAll()
      .then(response => {
        console.log('response is: ', response)
        setPersons(response)
        console.log('whats reponse.persons its ', response)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorNotification message={errorMessage} />
      <Search value={newSearch} onChange={handleSearchChange} />
      <h2>Add a new</h2>
      <AddNumber addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Listings persons={personsToShow()} deleteHandler={deleteHandler}/>
    </div>
  )
}

export default App