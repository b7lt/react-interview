import { useState } from "react"
import Contestants from "./Contestants";
import SignupForm from "./SignupForm";

const SignUp = ({contestants, onAdd, ongoing}) => {

    return(
        <div className="signup">
            <h3>Sign up for Today's Game</h3>
            {!ongoing ? <SignupForm onAdd={onAdd} /> : <p>Game in progress, signup closed!</p>}
            <Contestants contestants={contestants}/>
        </div>
    )
}

export default SignUp