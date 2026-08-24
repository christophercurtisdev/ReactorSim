import React, { useEffect, useState } from 'react';
import TickSystem from '../Core/TickSystem';
import Game from '../Core/Game';
import FuelArraySwitchesComponent from './FuelArraySwitchesComponent';

export default function GameComponent() {
  const [inputLocked, setInputLocked] = useState(false);

  useEffect(() => {
    const tickSystem = TickSystem.getInstance();

    // Start the tick system (only starts on first call)
    tickSystem.start();

    // Subscribe to tick updates
    const unsubscribeFromTickUpdates = tickSystem.subscribeToTickEvents((currentTick) => {
      // setTickCount(currentTick);
      Game.getInstance().tick(currentTick);
    });

    // Subscribe to tick updates
    const unsubscribeFromStopStartUpdates = tickSystem.subscribeToStopStartEvents((isRunning) => {
      if (isRunning) {
        Game.getInstance().play();
      } else {
        Game.getInstance().pause();
      }
      setInputLocked(!isRunning);
    });

    return () => {
      // Unsubscribe from this component
      unsubscribeFromStopStartUpdates();
      unsubscribeFromTickUpdates();
    };
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 content-stretch w-full p-3">
      <div className='border col-span-8 row-span-2'>
        <FuelArraySwitchesComponent />
      </div>
      <div className='border'>Text</div>
      <div className='border'>Text</div>
      <div className='border'>Text</div>
      <div className='border'>Text</div>
      <div className='border'>Text</div>
      <div className='border'>Text</div>
      <div className='border'>Text</div>
      <div className='border'>Text</div>
      <div className='border'>Text</div>
      <div className='border'>Text</div>
      <div className='border'>Text</div>
      <div className='border'>Text</div>
      <div className='border'>Text</div>
      <div className='border'>Text</div>
      <div className='border'>Text</div>
      <div className='border'>Text</div>
      <div className='border'>Text</div>
    </div>
  );
};