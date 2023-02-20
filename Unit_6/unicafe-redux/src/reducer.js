const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
      case 'GOOD': {
        const incrementedGood = state.good + 1
        const newState = { ...state, good: incrementedGood }
        return newState
      }
      case 'OK': {
        const incrementedOK = state.ok + 1
        const newState = { ...state, ok: incrementedOK }
        return newState
      }
      case 'BAD': {
        const incrementedBad = state.bad + 1
        const newState = { ...state, bad: incrementedBad }
        return newState
      }
      case 'ZERO': {
        return initialState
      }
      default: return state
    }
  
  }
  
  export default counterReducer