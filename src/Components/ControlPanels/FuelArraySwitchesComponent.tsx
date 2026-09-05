import Game from '../../Core/Game';
import type FuelRod from '../../Reactor/Objects/FuelRod';
import FuelRodSwitchComponent from './FuelRodSwitchComponent';

export default function FuelArraySwitchesComponent({updateDetailsPanel}: {updateDetailsPanel: (rod: FuelRod) => void}) {
    let fuelRods = Game.getInstance().getFuelArray().fuelRods;
    return (
        <div className='grid grid-flow-col grid-rows-4 content-center'>
            {fuelRods.map((column) => (
                column.map((rod) => (
                    <FuelRodSwitchComponent updateDetailsPanel={updateDetailsPanel} fuelRod={rod}/>
                    // <div>
                    //     <label className="tgl-43">
                    //     <input className="tgl-43__input" type="checkbox" />
                    //     <span className="tgl-43__stage" aria-hidden="true">
                    //         <span className="tgl-43__dial">
                    //         <span className="tgl-43__indicator"></span>
                    //         </span>
                    //     </span>
                    //     </label>
                    // </div>
                ))
            ))}
        </div>
    );
}