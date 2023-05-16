import AdminNotOngoing from "./AdminNotOngoing"
import AdminOngoing from "./AdminOngoing"

const AdminLoggedIn = ({ongoing, contestants, tournament, currentTier, enableTournament, advanceTier, setWinner}) => {
    return (
        <>
            {!ongoing ? <AdminNotOngoing contestants={contestants} enableTournament={enableTournament}/> : <AdminOngoing tournament={tournament} currentTier={currentTier} advanceTier={advanceTier} setWinner={setWinner}/>}
        </>
    )
}
export default AdminLoggedIn