import { useEffect, useState } from "react";
import Game from "../../Core/Game";

export default function ClockComponent() {
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        const unsubscribeFromTickUpdates = Game.getInstance().listenToTickEvents((isRunning) => {
            setAngle(isRunning);
        });

        return () => unsubscribeFromTickUpdates();
    });

    let increments = [];
    for (let index = 0; index < 60; index++) {
        increments.push(<div className="clock-increment text-xs text-neon-pink">&#x2303;</div>);
    }

    let content = (<div className="clock">
        <div className="big-hand"></div>
        <div>
            {increments}
        </div>
    </div>)
    return (content);
}