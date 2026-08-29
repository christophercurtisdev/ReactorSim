import { useEffect, useState } from 'react';
import Game from '../Core/Game';
import FuelType from '../Core/TypeLists/FuelType';
import FuelRod from '../Reactor/Objects/FuelRod';
import NixieHtmlEntity from './NixieHtmlEntityComponent';
import FuelRodStatus from '../Core/TypeLists/FuelRodStatus';

export default function FuelRodSwitchComponent({fuelRod}: {fuelRod: FuelRod}) {
    const [litIcon, setLitIcon] = useState(-1);
    const [switchIsOn, setSwitchIsOn] = useState(false);

    let switchLedClass = 'right '+FuelType.COLOUR(fuelRod.fuelType);
    let icons = [];
    icons[FuelRodStatus.HEALTHY] = ['&#x269b;', 'blue']; // Active
    icons[FuelRodStatus.IRRADIATED] = ['&#x2622;', 'green']; // Irradiated
    icons[FuelRodStatus.HOT] = ['&#x2668;', 'red']; // Hot
    icons[3] = ['&#x267a;', 'white']; // ???

    useEffect(() => {
        const game = Game.getInstance();

        const unsubscribeFromTickUpdates = game.listenToTickEvents((currentTick) => {
            if (fuelRod.getEngaged()) {
                setLitIcon(fuelRod.status());
            } else {
                if (fuelRod.status() == FuelRodStatus.HEALTHY) {
                    setLitIcon(-1);
                } else {
                    setLitIcon(3);
                }
            }
        });

        return () => {
            unsubscribeFromTickUpdates();
        };
    }, []);

    function onSwitchToggle() {
        let direction = switchIsOn ? 'Disengaging' : 'Engaging'
        let action = { ticks: 30, action: () => {fuelRod.setEngaged(!switchIsOn) }, description: "Fuel Rod "+fuelRod.label+" "+direction }
        Game.getInstance().pushToActionQueue(action);
        setSwitchIsOn(!switchIsOn);
    }

    return (
        <div className='flex'>
            <label className="switch">
                <input className="fuel-rod-checkbox" type="checkbox" onChange={onSwitchToggle}/>
                <span className="toggle">
                    <span className="left">{fuelRod.label}</span>
                    <span className={switchLedClass}>&#8226;</span>
                </span>
            </label>
            <NixieHtmlEntity nixieIcons={icons} litIcon={litIcon} />
        </div>
    );
}