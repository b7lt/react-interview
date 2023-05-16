const RecentWinner = ({winner}) => {
    return (
        <div className="winner">
            <p>{winner.name}</p>
            <p>{winner.timestamp}</p>
        </div>
    )
}

export default RecentWinner