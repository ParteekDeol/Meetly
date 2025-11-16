import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Quiz from './Quiz.jsx'
import Location from './Location.jsx'
import Landing from './Landing.jsx'

function App() {
  const [location, setLocation] = useState(0)
  const [plan, setPlan] = useState(null)

  return (
    <>
      <Landing onStart={() => setLocation(null)} />
      <Quiz setLocation={setLocation} setPlan={setPlan} />
      {location && <Location location={location} plan={plan} />}
    </>
  )
}

export default App
