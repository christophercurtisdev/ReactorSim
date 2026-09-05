import { useEffect, useState } from "react";
import Game from "../../Core/Game";
import CRTCopmonent from "../Partials/CRTComponent";
import FuelRod from "../../Reactor/Objects/FuelRod";

export default function ReactorStatusComponent({rod}: {rod: FuelRod}) {
    const [reactorFuelArrayHeat, setReactorFuelArrayHeat] = useState(0);
    const [reactorFuelArrayRoentgen, setReactorFuelArrayRoentgen] = useState(0);
    const [selectedRod] = useState(rod);

    useEffect(() => {
        const unsubscribeFromTickUpdates = Game.getInstance().listenToTickEvents(() => {
            setReactorFuelArrayHeat(Game.getInstance().getFuelArray().temperature);
            setReactorFuelArrayRoentgen(Game.getInstance().getFuelArray().getTotalRoentgen());
        });

        return () => {
            unsubscribeFromTickUpdates();
        };
    }, []);

    let content = <div className="justify-center items-center flex h-full">
            <div className="flex flex-col h-full w-full">
                <div className="flex text-xs justify-between">
                    <div className="crt-text">ENGAGED RODS: </div>
                    <div className="crt-text">|{Math.round(reactorFuelArrayHeat)}&deg;|{reactorFuelArrayRoentgen}R|100&#x2661;</div>
                </div> 
                <hr />
                <div className="crt-text text-xl font-bold underline">FUEL ROD: {selectedRod.label} ({selectedRod.rodNumber})</div>
                <div className="crt-text text-lg">TEMPERATURE: {selectedRod.temperature} ({selectedRod.maximumTemperature} MAX)</div>
                <div className="crt-text text-lg">ROENTGEN: {selectedRod.roentgen} ({selectedRod.maximumRoentgen} MAX)</div>
                <div className="crt-text text-lg">STATUS: {selectedRod.label ? selectedRod.status().name : ''}</div>
            </div>
        </div>
    return <CRTCopmonent content={content} />
}