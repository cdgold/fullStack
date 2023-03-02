import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const UserRow = ({user}) => {
    if (user !== undefined) {
        console.log("user is: ", user)
        return(
            <tr key={user.id}>
                <td>
                    <Link to={`/users/${user.id}`}>{user.username} </Link>
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
    const users = useSelector(state => state.user.allUsers)

    if (users === null || users === []) {
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