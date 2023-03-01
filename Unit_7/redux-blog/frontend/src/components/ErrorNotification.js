import { useSelector } from "react-redux"

const ErrorNotification = () => {
    const message = useSelector(state => state.notification.error)
    const messageStyle = {
      color: "red",
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
        <div className="error" style = {messageStyle}>
          {message}
        </div>
      )
    }
  }

  export default ErrorNotification