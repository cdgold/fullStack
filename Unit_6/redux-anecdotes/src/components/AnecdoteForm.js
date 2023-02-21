import { createAnecdote } from "../reducers/anecdoteReducer" 
import { useDispatch } from 'react-redux'
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const newAnecdote = (event) => {
        event.preventDefault()

        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        dispatch(createAnecdote(content))
        const createNotification = `You created anecdote: "${content}"`
        dispatch(setNotification(createNotification))
        setTimeout(() => {dispatch(removeNotification())}, 5000)
    }

    return (
        <div>
        <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <input name="anecdote"/>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm