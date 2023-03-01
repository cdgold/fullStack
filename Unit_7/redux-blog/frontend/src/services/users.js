import axios from "axios"

const baseUrl = "/api/users"

const getUsers = async () => {
    const getResponse = await axios.get(baseUrl)
    console.log("Returning in users.js: ", getResponse.data)
    return getResponse.data
}

export default {
    getUsers
}