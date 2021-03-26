import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  const handleChallengeSucceed = () => {
    completeChallenge();
    resetCountdown();
  };

  const handleChallengeFailed = () => {
    resetChallenge();
    resetCountdown();
  };

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Earn {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Body" />
            <strong>New Challenge</strong>
            <p>{activeChallenge.description}.</p>
          </main>
          <footer>
            <button type="button" className={styles.challengeFailedButton} onClick={handleChallengeFailed}>
              Failed
            </button>
            <button type="button" className={styles.challengeSucceededButton} onClick={handleChallengeSucceed}>
              Completed
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finish a cycle to receive chalenges</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Go to the next level completig challenges.
          </p>
        </div>
      )}
    </div>
  );
}

export default ChallengeBox;
