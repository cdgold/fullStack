import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const UserRow = ({user}) => {
    if (user !== undefined) {
        console.log("user is: ", user)
        return(
            <TableRow key={user.id}>
                <TableCell>
                    <Link to={`/users/${user.id}`}>{user.username} </Link>
                </TableCell>
                <TableCell>
                    {user.blogs.length}
                </TableCell>
            </TableRow>
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
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Name of User </TableCell>
                            <TableCell> # of Blogs Created </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => <UserRow user={user} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Users