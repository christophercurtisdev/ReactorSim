import FuelArraySwitchesComponent from './ControlPanels/FuelArraySwitchesComponent';
import MenuButtonsComponent from './ControlPanels/MenuButtonsComponent';
import AnimationScreenComponent from './ControlPanels/AnimationScreenComponent';
import Game from '../Core/Game';
import { useEffect } from 'react';
import QueuedActionsComponent from './ControlPanels/QueuedActionsComponent';
import ReactorStatusComponent from './ControlPanels/ReactorStatusComponent';

export default function GameComponent() {
  useEffect(() => {
    const unsubscribeFromTickUpdates = Game.getInstance().listenToTickEvents(() => {
      Game.getInstance().tick();
    });

    return () => {
      unsubscribeFromTickUpdates();
    };
  }, []);

  return (
    <div className="grid grid-cols-48 grid-rows-32 content-stretch w-full p-3">
      <div className='col-span-32 row-span-14 overflow-x-scroll overflow-y-scroll'>
        <FuelArraySwitchesComponent />
      </div>
      <div className="row-span-16 col-span-16">
        <AnimationScreenComponent />
      </div>
      <div className="row-span-4 col-span-32">Power generated / Power required this round</div>
      <div className="row-span-16 col-span-8">
        <QueuedActionsComponent />
      </div>
      <div className="row-span-8 col-span-8">
          VENT
      </div>
      <div className="row-span-11 col-span-11">Use item and consumables</div>
      <div className="row-span-11 col-span-21">
        <ReactorStatusComponent />
      </div>
      <div className="row-span-8 col-span-8">
        <MenuButtonsComponent />
      </div>
      <div className="row-span-3 col-span-32">Desk toys/ items/ relics/ whatever augments have been gathered on the run</div>
    </div>
  );
};