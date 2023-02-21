import { useSelector, useDispatch } from 'react-redux'
import { increaseVotes } from "../reducers/anecdoteReducer" 
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === "") {
            return state.anecdotes
        }
        else {
            const filteredAnecdotes = state.anecdotes.filter(anecdote => { 
                return anecdote.content.includes(state.filter)
            })
            return filteredAnecdotes
        }
    })
    const dispatch = useDispatch()
    
    const vote = (anecdote) => {
      dispatch(increaseVotes(anecdote.id))
      const voteNotification = `You voted for: "${anecdote.content}"`
      dispatch(setNotification(voteNotification))
      setTimeout(() => {dispatch(removeNotification())}, 5000)
    }

    return (
    <div>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList