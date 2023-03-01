import { useSelector } from "react-redux"

const Notification = ( {message} ) => {
    message = useSelector(state => state.notification.message)
    const messageStyle = {
      color: "green",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
    if (message === null || message === "") {
      return null
    }
    else {
      return (
        <div style = {messageStyle}>
          {message}
        </div>
      )
    }
  }

  export default Notification