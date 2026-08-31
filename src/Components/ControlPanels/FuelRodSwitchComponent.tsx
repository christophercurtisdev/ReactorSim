import { useEffect, useState } from 'react';
import Game from '../../Core/Game';
import FuelType from '../../Core/TypeLists/FuelType';
import FuelRod from '../../Reactor/Objects/FuelRod';
import NixieHtmlEntity from '../Partials/NixieHtmlEntityComponent';
import FuelRodStatus from '../../Core/TypeLists/FuelRodStatus';
import QueueActionType from '../../Core/TypeLists/QueueActionType';
import CRTCopmonent from '../Partials/CRTComponent';

export default function FuelRodSwitchComponent({fuelRod}: {fuelRod: FuelRod}) {
    const [litIcon, setLitIcon] = useState(-1);
    const [switchIsOn, setSwitchIsOn] = useState(false);

    let icons = [];
    icons[FuelRodStatus.HEALTHY] = ['&#x269b;', 'blue']; // Active
    icons[FuelRodStatus.IRRADIATED] = ['&#x2622;', 'green']; // Irradiated
    icons[FuelRodStatus.HOT] = ['&#x2668;', 'red']; // Hot
    icons[3] = ['&#x267a;', 'white']; // ???

    useEffect(() => {
        const game = Game.getInstance();

        const unsubscribeFromTickUpdates = Game.getInstance().listenToTickEvents(() => {
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
        let action = { 
            ticks: 30, 
            action: () => {fuelRod.setEngaged(!switchIsOn) }, 
            description: fuelRod.label+" "+direction, 
            actionType: switchIsOn ? QueueActionType.DISENGAGE_FUEL_ROD : QueueActionType.ENGAGE_FUEL_ROD
        }
        Game.getInstance().pushToActionQueue(action);
        setSwitchIsOn(!switchIsOn);
    }

    let labelDisplay = (
    <div className='font-thin crt-text'>
        {fuelRod.label}
    </div>
    );

    return (
        <div className='flex flex-row-reverse justify-center items-center'>
            <div className="fuel-indicator">
                <span className='fuel-indicator-bar rounded border-4 border-t-mauve-900 border-l-mauve-900 border-b-mauve-700 border-r-mauve-700 w-4 top-2'></span>
                <span className='fuel-indicator-bar lit rounded border-4 border-t-mauve-900 border-l-mauve-900 border-b-mauve-700 border-r-mauve-700 w-4 top-4'></span>
                <span className='fuel-indicator-bar lit rounded border-4 border-t-mauve-900 border-l-mauve-900 border-b-mauve-700 border-r-mauve-700 w-4 top-6'></span>
                <span className='fuel-indicator-bar lit rounded border-4 border-t-mauve-900 border-l-mauve-900 border-b-mauve-700 border-r-mauve-700 w-4 top-8'></span>
                <span className='fuel-indicator-bar lit rounded border-4 border-t-mauve-900 border-l-mauve-900 border-b-mauve-700 border-r-mauve-700 w-4 top-10'></span>
                <span className='fuel-indicator-bar lit rounded border-4 border-t-mauve-900 border-l-mauve-900 border-b-mauve-700 border-r-mauve-700 w-4 top-12'></span>
            </div>
            <div className='w-16'>
                <CRTCopmonent content={labelDisplay} border={false} />
            </div>
            <label className="tgl-43">
                <input className="tgl-43__input" type="checkbox" onChange={onSwitchToggle} />
                <span className="tgl-43__stage" aria-hidden="true">
                    <span className="tgl-43__dial">
                    <span className="tgl-43__indicator"></span>
                    </span>
                </span>
            </label>
            <NixieHtmlEntity nixieIcons={icons} litIcon={litIcon} />
        </div>
    );
}