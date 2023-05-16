const AdminNotOngoing = ({contestants, enableTournament}) => {
    return (
        <>
            <p>There are currently {contestants.length} contestants registered.</p>
            {contestants.length != 0 ? <button className="btn" onClick={enableTournament}>Start the Tournament</button>
            : <button className="btn" disabled={true}>Cannot start tournament with 0 contestants.</button>}

        </>

    )
}

export default AdminNotOngoing