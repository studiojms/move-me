import { useContext } from 'react';
import styles from '../styles/components/Countdown.module.css';
import { CountdownContext } from '../contexts/CountdownContext';

function Countdown() {
  const { minutes, seconds, hasFinished, active, resetCountdown, startCountdown } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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
