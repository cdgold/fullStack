import { createAnecdote } from "../reducers/anecdoteReducer" 
import anecdoteService from "../services/anecdote"
import { useDispatch } from 'react-redux'
import { newNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const newAnecdote = async (event) => {
        event.preventDefault()

        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        dispatch(createAnecdote(content))
        const createNotification = `You created anecdote: "${content}"`
        dispatch(newNotification(createNotification), 2)

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