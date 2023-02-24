import { useQuery, useMutation, useQueryClient } from "react-query"
import anecdoteService from "../services/anecdote"
import { useNotificationDispatch, setNotification } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation(anecdoteService.createAnecdote)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content:content, votes:0 }, {
      onSuccess: () => {
        dispatch({ type: "SET_MESSAGE", payload: `Added anecdote: ${content}` })
        setTimeout(() => { dispatch({ type:"DELETE_MESSAGE" }) }, 5000)
        queryClient.invalidateQueries("anecdotes")
      },
      onError: (TError) => {
        dispatch({ type: "SET_MESSAGE", payload: `Error! ${TError.response.data.error}` })
        setTimeout(() => { dispatch({ type:"DELETE_MESSAGE" }) }, 5000 )
      }
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
