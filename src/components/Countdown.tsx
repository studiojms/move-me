import { useContext, useEffect, useState } from 'react';
import styles from '../styles/components/Countdown.module.css';

import { ChallengesContext } from '../contexts/ChallengeContext';

let countdownTimeout: NodeJS.Timeout;

function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60);
  const [active, setActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  const startCountdown = () => {
    setActive(true);
  };

  const resetCountdown = () => {
    clearInterval(countdownTimeout);
    setActive(false);
    setTime(0.1 * 60);
  };

  useEffect(() => {
    if (active && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (active && time == 0) {
      setHasFinished(true);
      setActive(false);
      startNewChallenge()
    }
  }, [active, time]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      {hasFinished ? (
        <button type="button" className={styles.countdownButton} disabled>
          Finished
        </button>
      ) : (
        <>
          {!active && (
            <button type="button" className={styles.countdownButton} onClick={startCountdown}>
              Start
            </button>
          )}
          {active && (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Stop
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Countdown;
