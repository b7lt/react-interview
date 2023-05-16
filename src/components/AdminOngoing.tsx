import { useCallback, useState } from "react";
import Matches from "./Matches"

const AdminOngoing = ({tournament, currentTier, advanceTier, setWinner}) => {


    const ready = () => {
        const allNull = tournament.filter((m) => m.tier == currentTier && m.winner == null)
        if(allNull.length == 0) return true
        return false
    }

    const onClick = (e) => {
        e.preventDefault()
        advanceTier()
    }
    return(
        <div>
            <p>Currently tier {currentTier}</p>
            <Matches tournament={tournament} currentTier={currentTier} setWinner={setWinner} ready={ready} />
            { ready() && <button onClick={onClick}>Continue to next tier</button>}
        </div>
    )
}

export default AdminOngoing