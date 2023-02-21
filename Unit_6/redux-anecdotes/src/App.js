import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAnecdotes } from "./reducers/anecdoteReducer"
import anecdoteService from "./services/anecdote"
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => {
      dispatch(setAnecdotes(anecdotes))
    })

  }, [dispatch])

  return (
    <div>
      <Notification /> <br></br>
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App