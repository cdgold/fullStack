import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import { increaseVotes, createAnecdote } from "./reducers/anecdoteReducer" 
import { useSelector, useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()

  const newAnecdote = (event) => {
    event.preventDefault()
    
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App