import { useEffect, useState } from 'react';
import TickSystem from '../Core/TickSystem';
import Game from '../Core/Game';
import FuelArraySwitchesComponent from './FuelArraySwitchesComponent';

export default function GameComponent() {
  const [inputLocked, setInputLocked] = useState(false);

  useEffect(() => {
    const tickSystem = TickSystem.getInstance();

    // Start the game (only starts on first call)
    Game.getInstance().start();

    // Subscribe to tick updates
    const unsubscribeFromTickUpdates = tickSystem.subscribeToTickEvents((currentTick) => {
      Game.getInstance().tick(currentTick);
    });

    // Subscribe to tick updates
    const unsubscribeFromStopStartUpdates = tickSystem.subscribeToStopStartEvents((isRunning) => {
      if (isRunning) {
        Game.getInstance().resume();
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
    <div className="grid grid-cols-48 grid-rows-32 content-stretch w-full p-3">
      <div className='border col-span-32 row-span-18 overflow-x-scroll overflow-y-scroll'>
        <FuelArraySwitchesComponent />
      </div>
      <div className="border row-span-16 col-span-16">Screen for current queued action</div>
      <div className="border row-span-16 col-span-8">Queued actions</div>
      <div className="border row-span-8 col-span-8">Vent</div>
      <div className="border row-span-11 col-span-11"></div>
      <div className="border row-span-11 col-span-21">Reactor overall irradiation, temperature, load, and generation graphs</div>
      <div className="border row-span-8 col-span-8">Start stop pause resume</div>
      <div className="border row-span-3 col-span-32">Desk toys/ items/ relics/ whatever augments have been gathered on the run</div>
    </div>
  );
};