import { useEffect, useState } from 'react';
import TickSystem from '../Core/TickSystem';

export default function TickDebugComponent() {
  const [tickCount, setTickCount] = useState(0);
  const [ticksRunning, setTicksRunning] = useState(true);

  useEffect(() => {
    const tickSystem = TickSystem.getInstance();

    // Start the tick system (only starts on first call)
    tickSystem.start();

    // Subscribe to tick updates
    const unsubscribeFromTickUpdates = tickSystem.subscribeToTickEvents((currentTick) => {
      setTickCount(currentTick);
    });

    // Subscribe to tick start and stop events
    const unsubscribeFromStopStartUpdates = tickSystem.subscribeToStopStartEvents((isRunning) => {
      setTicksRunning(isRunning);
    });

    return () => {
      // Unsubscribe from this component
      unsubscribeFromStopStartUpdates();
      unsubscribeFromTickUpdates();
    };
  }, []);

  return (
    <div className='fixed right-0 top-0 opacity-15 hover:opacity-75 bg-gray-400 transition delay-150 duration-300 z-50'>
      <p>Running: {ticksRunning ? 'TRUE' : 'FALSE'}</p>
      <p>Ticks since load: {tickCount}</p>
    </div>
  );
};