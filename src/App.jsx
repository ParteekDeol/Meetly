import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Quiz from './Quiz.jsx'
import Location from './Location.jsx'
import Landing from './Landing.jsx'
import LoadingScreen from "./LoadingScreen.jsx";

function App() {
  const [isQuizVisible, setIsQuizVisible] = useState(false);
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);
  const [isLocationVisible, setIsLocationVisible] = useState(false);

  const [location, setLocation] = useState(0);
  const [plan, setPlan] = useState(null);
  const [images, setImages] = useState(null);

  const [progress, setProgress] = useState(1);

  return (
    <>
      <Landing onStart={() => setIsQuizVisible(true)} />
      <Quiz setLocation={setLocation} setPlan={setPlan} setImages={setImages} isVisible={isQuizVisible} setIsVisible={setIsQuizVisible} setIsLoadingVisible={setIsLoadingVisible} setIsLocationVisible={setIsLocationVisible} setProgress={setProgress}/>
      <LoadingScreen isLoadingVisible={isLoadingVisible} progress={progress}/>
      {location ? <Location location={location} plan={plan} images={images} isLocationVisible={isLocationVisible} /> : null}
    </>
  )
}

export default App
