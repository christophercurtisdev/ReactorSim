import FuelTypes from '../Core/TypeLists/FuelTypes';
import FuelRod from '../Reactor/Objects/FuelRod';

export default function FuelRodSwitchComponent({fuelRod}: {fuelRod: FuelRod}) {
    let switchLedClass = 'right '+FuelTypes.COLOUR(fuelRod.fuelType);
    return (
        <div className='flex'>
            <label className="switch">
                <input className="fuel-rod-checkbox" type="checkbox" />
                <span className="toggle">
                    <span className="left">{fuelRod.label}</span>
                    <span className={switchLedClass}>&#8226;</span>
                </span>
            </label>
            {/* Mega confusing symbols for how the rod is doing */}
            <div>&#128783;</div>
        </div>
    );
}