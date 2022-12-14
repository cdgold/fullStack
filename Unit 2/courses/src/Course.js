const Course = ({ course }) => {
    console.log("Received: ", course)
    let parts = course.parts.map((part) => {
      return (
        <p key={part.id}> {part.name} {part.exercises} </p>
      )
    })
    
  let sum = course.parts.reduce((accumulator, part) => {
    return(accumulator + part.exercises)
    } , 0
  )
  
  
    return (
      <div>
        <h1> {course.name} </h1>
        <div>
          {parts}
          <b>total of {sum} exercises</b>
        </div>
      </div>
    )
  }

  export default Course