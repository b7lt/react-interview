import Contestant from "./Contestant"

const Contestants = ({contestants}) => {
    return(
        <div className="contestants">
            <p>Contestants:</p>
            <ul>
            {
                contestants.map(c => {
                    return <Contestant key={c.id} contestant={c} />
                })
            }
            </ul>

        </div>
    )
}

export default Contestants