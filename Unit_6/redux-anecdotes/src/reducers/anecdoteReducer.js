const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const compareVotes = (a, b) => {
  if (a.votes > b.votes) {
    return -1
  }
  else if (a.votes < b.votes) {
    return 1
  }
  else { return 0 }
}

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const increaseVotes = (id) => {
  return {
    type: "INCREASE_VOTES",
    payload: {
      id: id
    }
  }
}

export const createAnecdote = (content) => {
  let newAnecdote = asObject(content)
  return {
    type: "CREATE_ANECDOTE",
    payload: newAnecdote
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case "INCREASE_VOTES": {
      let newState = state.map(anecdote => { 
        if (action.payload.id === anecdote.id) {
          const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
          return newAnecdote 
        }
        else { return anecdote }
      })
      console.log("New state is: ", newState)
      newState.sort((a, b) => compareVotes(a, b))
      return newState
    }
    case "CREATE_ANECDOTE": {
      return state.concat(action.payload)
    }
    default: return state
  }
}

export default reducer