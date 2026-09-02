import { useEffect, useState } from "react";
import Game from "../../Core/Game";
import CRTCopmonent from "../Partials/CRTComponent";
import FuelRod from "../../Reactor/Objects/FuelRod";

export default function ReactorStatusComponent() {
    const [reactorFuelArrayHeat, setReactorFuelArrayHeat] = useState(0);
    const [rod6, setRod6] = useState({} as FuelRod);

    useEffect(() => {
        const unsubscribeFromTickUpdates = Game.getInstance().listenToTickEvents(() => {
            setReactorFuelArrayHeat(Math.round(Game.getInstance().getFuelArray().temperature));
            setRod6(Game.getInstance().getFuelArray().getRod(6));
        });

        return () => {
            unsubscribeFromTickUpdates();
        };
    }, []);

    let content = <div className="justify-center items-center flex h-full">
            <div className="flex flex-col h-full w-full">
                <div className="crt-text text-xl">FUEL ARRAY TEMPERATURE: {reactorFuelArrayHeat}&#xb0;</div>
                <div className="crt-text text-xl">FUEL ARRAY IRRADIATED: 20R</div>
                <hr />
                <div className="crt-text text-xl">FUEL ROD 6 TEMPERATURE: {rod6.temperature}</div>
                <div className="crt-text text-xl">FUEL ROD 6 ROENTGEN: {rod6.roentgen}</div>
            </div>
        </div>
    return <CRTCopmonent content={content} />
}