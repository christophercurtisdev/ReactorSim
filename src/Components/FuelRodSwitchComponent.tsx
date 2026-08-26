import FuelType from '../Core/TypeLists/FuelType';
import FuelRod from '../Reactor/Objects/FuelRod';

export default function FuelRodSwitchComponent({fuelRod}: {fuelRod: FuelRod}) {
    let switchLedClass = 'right '+FuelType.COLOUR(fuelRod.fuelType);
    let litNixieIconClass = 'z-50 text-neon-'+FuelType.COLOUR(fuelRod.fuelType)+' text-3xl font-bold font-mono absolute top-1 left-1';
    let unlitNixieIconClass = 'text-unlit-neon text-3xl font-bold font-mono absolute top-1 left-1';
    return (
        <div className='flex'>
            <label className="switch">
                <input className="fuel-rod-checkbox" type="checkbox" />
                <span className="toggle">
                    <span className="left">{fuelRod.label}</span>
                    <span className={switchLedClass}>&#8226;</span>
                </span>
            </label>
            <div className="relative">
                <div className={unlitNixieIconClass}>&#x2668;</div>
                <div className={unlitNixieIconClass}>&#x2622;</div>
                <div className={unlitNixieIconClass}>&#x267a;</div>
                <div className={unlitNixieIconClass}>&#x269b;</div>
            </div>
        </div>
    );
}