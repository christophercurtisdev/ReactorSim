import { useEffect, useState } from "react";
import Game from "../../Core/Game";
import CRTCopmonent from "../Partials/CRTComponent";

export default function ReactorStatusComponent() {
    const [reactorFuelArrayHeat, setReactorFuelArrayHeat] = useState(0);

    useEffect(() => {
        const unsubscribeFromTickUpdates = Game.getInstance().listenToTickEvents(() => {
            setReactorFuelArrayHeat(Math.round(Game.getInstance().getFuelArray().temperature));
        });

        return () => {
            unsubscribeFromTickUpdates();
        };
    }, []);

    let content = <div className="justify-center items-center flex h-full">
            <div className="flex flex-col h-full w-full">
                <div className="crt-text text-xl">FUEL ARRAY TEMPERATURE: {reactorFuelArrayHeat}&#xb0;</div>
                <div className="crt-text text-xl">FUEL ARRAY IRRADIATED: 20R</div>
            </div>
        </div>
    return <CRTCopmonent content={content} />
}