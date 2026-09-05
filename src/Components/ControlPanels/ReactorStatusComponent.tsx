import { useEffect, useState } from "react";
import Game from "../../Core/Game";
import CRTCopmonent from "../Partials/CRTComponent";
import FuelRod from "../../Reactor/Objects/FuelRod";

export default function ReactorStatusComponent() {
    const [reactorFuelArrayHeat, setReactorFuelArrayHeat] = useState(0);
    const [reactorFuelArrayRoentgen, setReactorFuelArrayRoentgen] = useState(0);
    const [selectedRod, setSelectedRod] = useState({} as FuelRod);

    useEffect(() => {
        const unsubscribeFromTickUpdates = Game.getInstance().listenToTickEvents(() => {
            setReactorFuelArrayHeat(Game.getInstance().getFuelArray().temperature);
            setReactorFuelArrayRoentgen(Game.getInstance().getFuelArray().getTotalRoentgen());
            setSelectedRod(Game.getInstance().getFuelArray().getRod(6));
        });

        return () => {
            unsubscribeFromTickUpdates();
        };
    }, []);

    let content = <div className="justify-center items-center flex h-full">
            <div className="flex flex-col h-full w-full">
                <div className="flex text-xs justify-between">
                    <div className="crt-text">FUEL ARRAY INFORMATION: </div>
                    <div className="crt-text">|{Math.round(reactorFuelArrayHeat)}&deg;|{reactorFuelArrayRoentgen}R|100&#x2661;</div>
                </div> 
                <hr />
                <div className="crt-text text-xl">FUEL ROD 6 TEMPERATURE: {selectedRod.temperature}</div>
                <div className="crt-text text-xl">FUEL ROD 6 ROENTGEN: {selectedRod.roentgen}</div>
            </div>
        </div>
    return <CRTCopmonent content={content} />
}