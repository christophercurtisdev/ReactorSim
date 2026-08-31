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

    return <div className="text-amber-50">{reactorFuelArrayHeat}</div>
}