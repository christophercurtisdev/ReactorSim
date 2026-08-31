import Game from '../../Core/Game';
import FuelRodSwitchComponent from './FuelRodSwitchComponent';

export default function FuelArraySwitchesComponent() {
    let fuelRods = Game.getInstance().getFuelArray().fuelRods;
    return (
        <div className='grid grid-flow-col grid-rows-5 content-center'>
            {fuelRods.map((column) => (
                column.map((rod) => (
                    <FuelRodSwitchComponent fuelRod={rod} />
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