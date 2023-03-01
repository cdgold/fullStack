import { useState } from "react"

const useField = (type) => {
    const [value, setValue] = useState("")

    const onChange = (event) => {
        setValue(event.target.value)
    }

    
    const reset = () => {
        setValue("")
    }

    const contents = () => {
        return { type, value, onChange }
    }

    return {
        type,
        onChange,
        value,
        contents,
        reset
    }
}
 
export default useField