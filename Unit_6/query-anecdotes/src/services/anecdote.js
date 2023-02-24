import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAnecdotes = () => {
    return axios.get(baseUrl).then(res=>res.data)
}

const createAnecdote = (newAnecdote) => {
    return axios.post(baseUrl, newAnecdote).then(res=>res.data)
}

const increaseAnecdoteVotes = (anecdote) => {
    const adjustedUrl = baseUrl + `/${anecdote.id}`
    const adjustedAnecdote = {...anecdote, votes:anecdote.votes+1}
    return axios.put(adjustedUrl, adjustedAnecdote)
}

const anecdoteService = { createAnecdote, getAnecdotes, increaseAnecdoteVotes }
export default anecdoteService