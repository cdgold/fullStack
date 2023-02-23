import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content:content, votes:0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

 const putIncrementVotes = async (id) => {
    const objectUrl = baseUrl + `/${id}`
    const oldNote = await axios.get(objectUrl)
    const note = {...oldNote.data, votes:oldNote.data.votes+1}
    const response = await axios.put(objectUrl, note)
    console.log("Response was: ", response.data)
    return response.data
 }


const anecdoteService = { getAll, createNew, putIncrementVotes }
export default anecdoteService