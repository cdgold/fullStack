const User = ({ user }) => {
    console.log("In user component, user is: ", user)
    
    if (user === undefined || user === null) {
        return null
    }

    return(
        <div>
        <h2>{user.name}</h2>
        <h1>added blogs</h1>
        {user.blogs.map(blog => {
            return(<li key={blog.id}>{blog.title}</li>)
        })}
        </div>
    )
}

export default User