import { useEffect, useState } from 'react';
import Game from '../Core/Game';
import FuelType from '../Core/TypeLists/FuelType';
import FuelRod from '../Reactor/Objects/FuelRod';
import NixieHtmlEntity from './NixieHtmlEntityComponent';

export default function FuelRodSwitchComponent({fuelRod}: {fuelRod: FuelRod}) {
    const [litIcon, setLitIcon] = useState(fuelRod.status())

    let switchLedClass = 'right '+FuelType.COLOUR(fuelRod.fuelType);
    let icons = [];
    icons[0] = ['&#x269b;', 'blue']; // Active
    icons[1] = ['&#x2622;', 'green']; // Irradiated
    icons[2] = ['&#x2668;', 'red']; // Hot
    icons[3] = ['&#x267a;', 'white']; // ???

    useEffect(() => {
        const game = Game.getInstance();

        const unsubscribeFromTickUpdates = game.listenToTickEvents((currentTick) => {
            setLitIcon(fuelRod.status());
        });

        return () => {
            unsubscribeFromTickUpdates();
        };
    }, []);

    return (
        <div className='flex'>
            <label className="switch">
                <input className="fuel-rod-checkbox" type="checkbox" />
                <span className="toggle">
                    <span className="left">{fuelRod.label}</span>
                    <span className={switchLedClass}>&#8226;</span>
                </span>
            </label>
            <NixieHtmlEntity nixieIcons={icons} litIcon={litIcon} />
        </div>
    );
}