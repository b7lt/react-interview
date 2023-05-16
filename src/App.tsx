import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import RecentWinners from './components/RecentWinners';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin';
import Navbar from './components/Navbar';

function App() {
  const [contestants, setContestants] = useState([])
  const [winners, setWinners] = useState([])
  const [ongoing, setOngoing] = useState(false)
  const [tournament, setTournament] = useState([])
  const [currentTier, setCurrentTier] = useState(1)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const getContestants = async () => {
      const contestantsFromServer = await fetchContestants()
      setContestants(contestantsFromServer)
    }
    const getWinners = async () => {
      const winnersFromServer = await fetchWinners()
      setWinners(winnersFromServer)
    }
    const getOngoing = async () => {
      const g = await fetchOngoing()
      setOngoing(g)
    }
    const getTournament = async () => {
      const tournamentData = await fetchTournament()
      setTournament(tournamentData)
    }
    const getCurrentTier = async () => {
      const ong = await fetchOngoing()
      if(!ong) setCurrentTier(1)
      else{
        const tournamentData = await fetchTournament()
        if(Object.keys(tournamentData).length === 1)
        {
          const match = await fetchMatch(1)
          setCurrentTier(match.tier)
        }
        else {
          const first = await fetchMatch(1)
          const second = await fetchMatch(2)
          if(first.tier > second.tier)
          {
            setCurrentTier(second.tier)
          }
          else {
            setCurrentTier(first.tier)
          }
        }
      }

    }


    getContestants()
    getWinners()
    getOngoing()
    getTournament()
    getCurrentTier()
  }, [])

  const fetchContestants = async () => {
    const res = await fetch("http://localhost:5000/contestants")
    const data = await res.json()
    return data
  }

  const fetchWinners = async () => {
    const res = await fetch("http://localhost:5000/recentWinners")
    const data = await res.json()
    return data
  }

  const fetchTournament = async () => {
    const res = await fetch("http://localhost:5000/tournament/")
    const data = await res.json()
    return data
  }

  const fetchMatch = async (id) => {
    const res = await fetch(`http://localhost:5000/tournament/${id}`)
    const data = await res.json()
    return data
  }


  const fetchOngoing = async () => {
    const tournamentData = await fetchTournament()
    if(Object.keys(tournamentData).length === 0)
    {
      return false
    }
    else{
      return true
    }
  }

  const addContestant = async (c) => {
    const res = await fetch("http://localhost:5000/contestants", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(c)
    })

    const data = await res.json()
    setContestants([...contestants, data])
  }

  const deleteContestant = async (id) => {
    const res = await fetch(`http://localhost:5000/contestants/${id}`, {
      method: 'DELETE',
    })
  }

  const removeAllContestants = async () => {
    contestants.forEach((c) => deleteContestant(c.id))
  }

  const addToTournament = async (p1, p2, tier) => {
    const res = await fetch(`http://localhost:5000/tournament/`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({p1, p2, tier, winner: null})
    })

    const data = await res.json()
    setTournament([...tournament, data])
  }

  const removeFromTournament = async (id) => {
    const res = await fetch(`http://localhost:5000/tournament/${id}`, {
      method: 'DELETE',
    })
    const updt = tournament.filter((m) => m.id != id)
    setTournament(updt)
  }

  const populateMatches = async (people: string[], tier) => {
    if(people.length % 2 != 0) {
      const index = Math.floor(Math.random() * people.length)
      const randomBye = people[index]
      await addToTournament(randomBye, null, tier + 1)
      people.splice(index, 1)
    }
    while(people.length >= 2)
    {
      let r1 = Math.random() * people.length
      let person1 = people.splice(r1, 1)[0]
      let r2 = Math.random() * people.length
      let person2 = people.splice(r2, 1)[0]
      await addToTournament(person1, person2, tier)
    }
  }

  const enableTournament = async () => {
    const people: string[] = contestants.map((c) => c.name)
    await populateMatches(people, currentTier)
    await removeAllContestants()
    const tdata = await fetchTournament()
    setTournament(tdata)
    setOngoing(true)
    setCurrentTier(1)
  }

  const deleteMatchesByTier = async (tier) => {
    const toDelete = tournament.filter((m) => m.tier == tier)
    toDelete.forEach((m) => removeFromTournament(m.id))
    const remaining = tournament.filter((m) => m.tier != tier)
    setTournament(remaining)
  }

  // const pushBackWinners = async () => {
  //   winners.forEach(async (w) => {
  //     const res = await fetch(`http://localhost:5000/recentWinners/${w.id}`, {
  //         method: "PUT",
  //         headers: {
  //             'Content-type': 'application/json'
  //         },
  //         body: JSON.stringify({w, id = w.id + 1}})
  //         })
  //     const data = await res.json()
  //     setTournament([...winners, data])
  //   })
  // }

  const addWinner = async (name) => {
    const today = new Date(Date.now()).toLocaleString().split(',')[0]
    // await pushBackWinners()

    const res = await fetch("http://localhost:5000/recentWinners", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({name: name, timestamp: today})
    })

    const data = await res.json()
    setWinners([data, ...winners])
  }

  const advanceTier = async () => {
    const prevRandomBye = tournament.filter((m) => m.tier != currentTier)
    setTournament([])
    let advancers;
    if(prevRandomBye.length != 0)
    {
      advancers = [...(tournament.filter((m) => m.winner != null).map((m) => m.winner)), prevRandomBye[0].p1]
      await removeFromTournament(prevRandomBye[0].id)
    }
    else{
      advancers = [...(tournament.filter((m) => m.winner != null).map((m) => m.winner))]
    }

    if(advancers.length > 1)
    {
      await deleteMatchesByTier(currentTier)
      await populateMatches(advancers, currentTier + 1)
      setCurrentTier(currentTier + 1)
    }
    else {
      await deleteMatchesByTier(currentTier)
      await addWinner(advancers[0])
      setCurrentTier(1)
      setOngoing(false)
    }

  }

  const setWinner = async (match, id, winner) => {
    const updMatch = {...match, winner: winner}
    const res = await fetch(`http://localhost:5000/tournament/${id}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updMatch)
        })
    const data = await res.json()
    const t = tournament.filter((m) => m.id != id)
    setTournament([data, ...t])

}

  return (
    <Router>
    <div className="App">
      <Navbar />
      <section className="main">
      <Routes>
        <Route
        path="/"
        element={
          <div className="container">
            <RecentWinners winners={winners} />
            <SignUp contestants={contestants} onAdd={addContestant} ongoing={ongoing}/>
          </div>
        } />

        <Route
        path='/admin'
        element={
        <Admin ongoing={ongoing} contestants={contestants} tournament={tournament} currentTier={currentTier} enableTournament={enableTournament} advanceTier={advanceTier} setWinner={setWinner} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        } />
      </Routes>
      </section>
    </div>
    </Router>
  );
}

export default App;
