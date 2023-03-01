import { useEffect, useState } from "react"
import userService from "../services/users"

const UserRow = ({user}) => {
    if (user !== undefined) {
        console.log("user is: ", user)
        return(
            <tr key={user.id}>
                <td>
                    {user.username}
                </td>
                <td>
                    {user.blogs.length}
                </td>
            </tr>
        ) 
    }
    else return null
}

const Users = () => {
    const [users, setUsers] = useState(null)

    useEffect(() => {
        const getFct = async () => {
          const userList = await userService.getUsers()
          setUsers(userList)
        }
        getFct()
    }, [])

    if (users === null) {
        return(
            <div>
              "No users to show..."
            </div>
        )
    }
    return(
        <div>
            <h2>users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                {users.map(user => <UserRow user={user} />)}
                </tbody>
            </table>
        </div>
    )
}

export default Users