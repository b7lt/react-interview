import RecentWinner from "./RecentWinner"

const RecentWinners = ({winners}) => {
    return (
        <div className="recentwinners">
            <h3>Recent Winners</h3>
            {
                winners.map(w => {
                    return <RecentWinner key={w.id} winner={w} />
                })
            }
        </div>
    )
}

export default RecentWinners