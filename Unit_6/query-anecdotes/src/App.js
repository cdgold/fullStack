import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from "react-query"
import anecdoteService from "./services/anecdote"
import {useNotificationDispatch} from "./NotificationContext"

const App = () => {
  const queryClient = useQueryClient()
  const voteIncrementMutation = useMutation(anecdoteService.increaseAnecdoteVotes)
  const dispatch = useNotificationDispatch()

  const handleVote = (anecdote) => {
    voteIncrementMutation.mutate(anecdote, {
      onSuccess: () => {
        dispatch({ type: "SET_MESSAGE", payload: `Added vote to anecdote: ${anecdote.content}` })
        setTimeout(() => { dispatch({ type:"DELETE_MESSAGE" }) }, 5000)
        queryClient.invalidateQueries("anecdotes")
      }
    })
  }

  const result = useQuery(
    "anecdotes", anecdoteService.getAnecdotes
  )

  if (result.isLoading) {
    return <div> Loading... </div>
  }

  if (result.isError) {
    return <div> Issue with server. </div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
