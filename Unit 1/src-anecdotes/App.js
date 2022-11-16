import { useState } from 'react'

const Anecdote = ({anecdote, point}) => {  
  return (
    <div>
      {anecdote}
      <br></br>
      has {point} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  let startPoints = new Array(anecdotes.length).fill(0)
  const [points, setPoints] = useState(startPoints)

  const randomSelected = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  
  const vote = () => {
    const copy = { ...points }
    copy[selected] += 1
    setPoints(copy)
  }

  const findBest = () => {
    let maxVotes = -1
    let maxIndex = -1
    for (let i = 0; i < anecdotes.length; i++) {
      if (points[i] > maxVotes) {
        maxIndex = i
        maxVotes = points[i]
      }
    }
    return maxIndex;
  }

  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      <Anecdote anecdote={anecdotes[selected]} point={points[selected]} />
      <br></br>
      <button onClick={vote} > vote </button>
      <button onClick={randomSelected} > next anecdote </button>
      <h1>
        Best anecdote
      </h1>
      <Anecdote anecdote={anecdotes[findBest()]} point={points[findBest()]}/>
    </div>
  )
}



export default App