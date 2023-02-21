import { useSelector, useDispatch } from 'react-redux'
import { increaseVotes } from "../reducers/anecdoteReducer" 

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
    
    const vote = (id) => {
      dispatch(increaseVotes(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList