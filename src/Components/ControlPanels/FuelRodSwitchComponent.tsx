import { useEffect, useState } from 'react';
import Game from '../../Core/Game';
import FuelRod from '../../Reactor/Objects/FuelRod';
import NixieHtmlEntity from '../Partials/NixieHtmlEntityComponent';
import FuelRodStatus from '../../Core/TypeLists/FuelRodStatus';
import CRTCopmonent from '../Partials/CRTComponent';

export default function FuelRodSwitchComponent({fuelRod}: {fuelRod: FuelRod}) {
    const [litIcon, setLitIcon] = useState(-1);
    const [switchIsOn, setSwitchIsOn] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const icons = [];
    icons[FuelRodStatus.HEALTHY.id] = ['&#x269b;', 'blue']; // Active
    icons[FuelRodStatus.IRRADIATED.id] = ['&#x2622;', 'green']; // Irradiated
    icons[FuelRodStatus.HOT.id] = ['&#x2668;', 'red']; // Hot
    icons[FuelRodStatus.COLD.id] = ['&#x2744;', 'white']; // Cold

    useEffect(() => {
        const game = Game.getInstance();

        const unsubscribeFromTickUpdates = Game.getInstance().listenToTickEvents(() => {
            if (fuelRod.hasExceededMaxTemperature()) {
                Game.getInstance().disengageFuelRod(fuelRod, 'TEMP TO HIGH - DISENGAGING '+fuelRod.label)
                setSwitchIsOn(false);
                setDisabled(true);
            }

            if(fuelRod.hasExceededMaxRoentgen()) {
                Game.getInstance().disengageFuelRod(fuelRod, 'RADS TO HIGH - DISENGAGING '+fuelRod.label);
                setSwitchIsOn(false);
                setDisabled(true);
            }

            if (fuelRod.getEngaged()) {
                setLitIcon(disabled ? FuelRodStatus.COLD.id : fuelRod.status().id);
            } else {
                if (fuelRod.status().id == FuelRodStatus.HEALTHY.id) {
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
        switchIsOn ? Game.getInstance().disengageFuelRod(fuelRod) : Game.getInstance().engageFuelRod(fuelRod);
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
                <CRTCopmonent content={labelDisplay} border={false} vignette={false} />
            </div>
            <label className="tgl-43">
                <input className="tgl-43__input" type="checkbox" onChange={onSwitchToggle} checked={switchIsOn} disabled={disabled}/>
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