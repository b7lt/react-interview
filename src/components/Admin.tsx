import { useState } from "react"

import AdminLoggedIn from "./AdminLoggedIn"
import AdminLogInScreen from "./AdminLogInScreen"

const Admin = ({ongoing, contestants, tournament, currentTier, enableTournament, advanceTier, setWinner, loggedIn, setLoggedIn}) => {
    const [pass, setPass] = useState('')

    const login = (e) => {
        e.preventDefault()
        console.log(e)
        if(pass=="password") setLoggedIn(true)
    }

    return (
        <div className="container admin">
            <h1>Admin</h1>
            {!loggedIn ? <AdminLogInScreen login={login} pass={pass} setPass={setPass}/>
            : <AdminLoggedIn ongoing={ongoing} contestants={contestants} tournament={tournament} currentTier={currentTier} enableTournament={enableTournament} advanceTier={advanceTier} setWinner={setWinner}/>}

        </div>
    )
}

export default Admin