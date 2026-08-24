import Game from '../Core/Game';
import FuelRodSwitchComponent from './FuelRodSwitchComponent';

export default function FuelArraySwitchesComponent() {
    let fuelRods = Game.getInstance().getFuelArray().fuelRods;
    return (
        <div className='grid grid-flow-col grid-rows-5'>
            {fuelRods.map((column) => (
                column.map((rod) => (
                    <FuelRodSwitchComponent fuelRod={rod} />
                ))
            ))}
        </div>
    );
}