import { useEffect, useState } from 'react';
import Game from '../../Core/Game';

export default function GameDebugComponent() {
  const [tickCount, setTickCount] = useState(0);
  const [ticksRunning, setTicksRunning] = useState(false);

  useEffect(() => {
    const game = Game.getInstance();

    const unsubscribeFromTickUpdates = game.listenToTickEvents((currentTick) => {
      setTickCount(currentTick);
    });

    const unsubscribeFromStopStartUpdates = game.listenToStopStartEvents((isRunning) => {
      setTicksRunning(isRunning);
    });

    return () => {
      unsubscribeFromStopStartUpdates();
      unsubscribeFromTickUpdates();
    };
  }, []);

  return (
    <div className='fixed right-0 top-0 opacity-15 hover:opacity-75 bg-gray-400 transition delay-150 duration-300 z-50'>
      <p>Game Running: {ticksRunning ? 'TRUE' : 'FALSE'}</p>
      <p>Game Ticks since load: {tickCount}</p>
    </div>
  );
};