import FuelType from '../Core/TypeLists/FuelType';
import FuelRod from '../Reactor/Objects/FuelRod';
import NixieHtmlEntity from './NixieHtmlEntityComponent';

export default function FuelRodSwitchComponent({fuelRod}: {fuelRod: FuelRod}) {
    let switchLedClass = 'right '+FuelType.COLOUR(fuelRod.fuelType);
    let icons = [];
    icons.push(['&#x2668;', 'yellow']);
    icons.push(['&#x2622;', 'yellow']);
    icons.push(['&#x267a;', 'yellow']);
    icons.push(['&#x269b;', 'yellow']);

    return (
        <div className='flex'>
            <label className="switch">
                <input className="fuel-rod-checkbox" type="checkbox" />
                <span className="toggle">
                    <span className="left">{fuelRod.label}</span>
                    <span className={switchLedClass}>&#8226;</span>
                </span>
            </label>
            <NixieHtmlEntity nixieIcons={icons} />
        </div>
    );
}