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
      <div className='col-span-32 row-span-14 overflow-x-scroll overflow-y-scroll p-1'>
        <FuelArraySwitchesComponent />
      </div>
      <div className="row-span-16 col-span-16 p-1">
        <AnimationScreenComponent />
      </div>
      <div className="row-span-4 col-span-32 p-1">Power generated / Power required this round</div>
      <div className="row-span-16 col-span-8 p-1">
        <QueuedActionsComponent />
      </div>
      <div className="row-span-8 col-span-8 p-1">
          Vent
      </div>
      <div className="row-span-11 col-span-11 p-1">Use item and consumables</div>
      <div className="row-span-11 col-span-21 p-1">
        <ReactorStatusComponent />
      </div>
      <div className="row-span-8 col-span-8 p-1">
        <MenuButtonsComponent />
      </div>
      <div className="row-span-3 col-span-32 p-1">Desk toys/ items/ relics/ whatever augments have been gathered on the run</div>
    </div>
  );
};