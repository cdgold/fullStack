import { useSelector, useDispatch } from 'react-redux'
import { incrementVotes } from "../reducers/anecdoteReducer" 
import { newNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        let arrayToSort = [...state.anecdotes]
        const sortedAnecdotes = arrayToSort.sort((a, b) => { return b.votes - a.votes })
        if (state.filter === "") {
            return sortedAnecdotes
        }
        else {
            const filteredAnecdotes = sortedAnecdotes.filter(anecdote => { 
                return anecdote.content.includes(state.filter)
            })
            return filteredAnecdotes
        }
    })
    const dispatch = useDispatch()
    
    const vote = (anecdote) => {
      dispatch(incrementVotes(anecdote.id))
      const voteNotification = `You voted for: "${anecdote.content}"`
      dispatch(newNotification(voteNotification), 5)
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