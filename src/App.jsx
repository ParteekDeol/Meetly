import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Quiz from './Quiz.jsx'
import Location from './Location.jsx'
import Landing from './Landing.jsx'

function App() {
  const [isQuizVisible, setIsQuizVisible] = useState(false)
  const [location, setLocation] = useState(0)
  const [plan, setPlan] = useState(null)
  const [images, setImages] = useState(null)

  return (
    <>
      <Landing onStart={() => setIsQuizVisible(true)} />
      <Quiz setLocation={setLocation} setPlan={setPlan} setImages={setImages} isVisible={isQuizVisible} setIsVisible={setIsQuizVisible} />
      {location ? <Location location={location} plan={plan} images={images} /> : null}
    </>
  )
}

export default App
