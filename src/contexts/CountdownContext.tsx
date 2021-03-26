import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengeContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  active: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

export const CountdownContext = createContext({} as CountdownContextData);

interface CountdownProviderProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60);
  const [active, setActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startCountdown = () => {
    setActive(true);
  };

  const resetCountdown = () => {
    clearInterval(countdownTimeout);
    setActive(false);
    setHasFinished(false);
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
      startNewChallenge();
    }
  }, [active, time]);

  return (
    <CountdownContext.Provider value={{ minutes, seconds, hasFinished, active, startCountdown, resetCountdown }}>
      {children}
    </CountdownContext.Provider>
  );
}
