import Match from "./Match"

const Matches = ({ tournament, currentTier, setWinner, ready}) => {

    return(
        <div className="matches">
        {
            tournament.map(m => {
                if(m.tier == currentTier)
                {
                    return <Match key={m.id} match={m} setWinner={setWinner} ready={ready} />
                }
            })
        }
        </div>
    )
}

export default Matches