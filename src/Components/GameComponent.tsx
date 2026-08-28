import FuelArraySwitchesComponent from './FuelArraySwitchesComponent';
import MenuButtonsComponent from './MenuButtonsComponent';
import AnimationScreenComponent from './AnimationScreenComponent';
import Game from '../Core/Game';
import { useEffect } from 'react';

export default function GameComponent() {
  const game = Game.getInstance();

  
  useEffect(() => {
    const game = Game.getInstance();

    const unsubscribeFromTickUpdates = game.listenToTickEvents((currentTick) => {
      Game.getInstance().tick();
    });

    return () => {
      unsubscribeFromTickUpdates();
    };
  }, []);

  return (
    <div className="grid grid-cols-48 grid-rows-32 content-stretch w-full p-3">
      <div className='border col-span-32 row-span-14 overflow-x-scroll overflow-y-scroll'>
        <FuelArraySwitchesComponent />
      </div>
      <div className="border row-span-16 col-span-16">
        <AnimationScreenComponent />
      </div>
      <div className="border row-span-4 col-span-32">Power generated / Power required this round</div>
      <div className="border row-span-16 col-span-8">Queued actions</div>
      <div className="border row-span-8 col-span-8">Vent</div>
      <div className="border row-span-11 col-span-11">Use item and consumables</div>
      <div className="border row-span-11 col-span-21">Reactor overall irradiation, temperature, load, and generation graphs</div>
      <div className="border row-span-8 col-span-8">
        <MenuButtonsComponent />
      </div>
      <div className="border row-span-3 col-span-32">Desk toys/ items/ relics/ whatever augments have been gathered on the run</div>
    </div>
  );
};