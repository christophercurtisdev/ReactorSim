import { useEffect, useState } from "react";
import Game from "../Core/Game";

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

    return (
        <div className="justify-center items-center flex h-full">
            <div className="crt flex h-full w-full justify-center items-center">
                <div className="crt-text">{reactorFuelArrayHeat}</div>
            </div>
        </div>
    );
}