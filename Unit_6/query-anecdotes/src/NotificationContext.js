import { createContext, useReducer, useContext } from 'react'

const initialState = ""

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
        return action.payload
    case "DELETE_MESSAGE":
        return initialState
    default:
        return state
  }
}

export const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "")

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const setNotification = (message) => {
  return async dispatch => {
    dispatch({ type:"SET_MESSAGE", payload:message })
  }
}



export default NotificationContext