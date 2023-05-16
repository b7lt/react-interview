import { useState } from "react"

const SignupForm = ({onAdd}) => {
    const [name, setName] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        if(!name)
        {
            alert("Please enter a name")
            return
        }
        onAdd({name})
        setName("")
    }
    return(
        <form className="signup-form" onSubmit={onSubmit} >
            <label htmlFor="name">Name:</label>
            <input type="text" className="name" placeholder="Enter name here"
            value={name}
            onChange={(e) => setName(e.target.value)}/>
            <input type="submit" value="Submit" className="btn"/>
        </form>
    )
}

export default SignupForm