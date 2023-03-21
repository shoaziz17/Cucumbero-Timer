import { useEffect, useState } from 'react';
import './App.css';
import { getPadTime } from './utilities/getPadTime';
import sound1 from './utilities/sound1.mp3';
import sound2 from './utilities/sound2.mp3';
import sound3 from './utilities/sound3.mp3';

function App() {

  const [timeLeft, setTimeLeft] = useState(25*60);
  const [isCounting, setIsCounting] = useState(false);

  const minutes = getPadTime(Math.floor(timeLeft / 60));
  const seconds = getPadTime(timeLeft - minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting &&
        setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0))
    }, 1000);
    if (timeLeft === 0) { setIsCounting(false) }
    return () => {
      clearInterval(interval);
    }
  }, [isCounting, timeLeft])


  const start = () => {
    if (timeLeft === 0) {
      setTimeLeft(5 * 60)
    }
    setIsCounting(true);
    new Audio(sound1).play();
  }
  const stop = () => {
    setIsCounting(false)
    new Audio(sound2).play();

  }
  const restart = () => {
    setIsCounting(false)
    setTimeLeft(25 * 60)
    new Audio(sound3).play();
  }


  return (
    <div className="app">
      <h1>Cucumbero</h1>
      <div className='timer'>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className='buttons'>
        {isCounting ? <button onClick={stop}>Stop</button> : <button onClick={start}>Start</button>}
        <button onClick={restart}>Restart</button>
      </div>
    </div>
  );
}

export default App;
