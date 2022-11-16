import { useState } from 'react'

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td> {text} </td>
      <td> {value} </td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        Please enter feedback first!
      </div>
    )
  }
  return ( 
    <table>
      <tbody>
      <StatisticLine value={props.good} text='good' />
      <StatisticLine value={props.neutral} text='neutral' />
      <StatisticLine value={props.bad} text='bad' />
      <StatisticLine value={props.all} text='all' />
      <StatisticLine value={((props.good) + (props.bad * -1)) / props.all} text='average' />
      <StatisticLine value={((props.good / props.all) * 100) + "%"} text='positive' />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const incrementNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const incrementBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>
        give feedback (please)
      </h1>
      <Button onClick={incrementGood} text='good' />
      <Button onClick={incrementNeutral} text='neutral' />
      <Button onClick={incrementBad} text='bad' />
      <h1>
        look! feedbacks!
      </h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />

    </div>
  )
}

export default App