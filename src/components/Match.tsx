const Match = ({match, setWinner, ready}) => {
    const click = async (e) => {
        e.preventDefault()
        console.log(e.target)
        e.target.className = "person matchwinner"
        if(e.target.textContent == match.p1)
        {
            e.target.nextSibling.nextSibling.className = "person"
        }
        else {
            e.target.previousSibling.previousSibling.className = "person"
        }
        await setWinner(match, match.id, e.target.textContent).then(ready())
        ready()
    }
    return(
        <div className="match">
            {match.p1 == match.winner
            ? <p className="person matchwinner" onClick={click}>{match.p1}</p>
            : <p className="person" onClick={click}>{match.p1}</p>}
            <p>vs.</p>
            {match.p2 == match.winner
            ? <p className="person matchwinner" onClick={click}>{match.p2}</p>
            : <p className="person" onClick={click}>{match.p2}</p>}
        </div>
    )
}

export default Match