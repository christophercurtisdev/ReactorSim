import { useEffect, useState } from "react";
import Game from "../../Core/Game";
import TickSystem from "../../Core/TickSystem";

export default function ClockComponent() {
    const [roundStarted, setRoundStarted] = useState(false);

    useEffect(() => {
        const unsubscribeFromRoundUpdates = Game.getInstance().listenToRoundStartStopEvents((isRunning) => {
            setRoundStarted(isRunning && Game.getInstance().getIsRunning());
        })

        return () => unsubscribeFromRoundUpdates();
    });

    let increments = [];
    for (let index = 0; index < 60; index++) {
        increments.push(<div className="clock-increment text-xs text-neon-pink">&#x2303;</div>);
    }

    const gameRound = Game.getInstance().getCurrentGameRound();

    let roundTimeInSeconds = roundStarted ? gameRound.getDayLength() / TickSystem.getInstance().getTickRate() : 0;
    let bigHandStyle = {animation: roundStarted ? 'tick '+roundTimeInSeconds+'s infinite linear' : ''};
    let onShiftSignClass = "w-full text-center font-mono ";
    onShiftSignClass += roundStarted ? "text-neon-yellow" : "text-unlit-neon"

    let content = (<div className="w-full h-full">
        <div className={onShiftSignClass}>
            ON SHIFT
        </div>
        <div className="clock">
            <div className="big-hand-container" style={bigHandStyle}>
                <div className={roundStarted ? "big-hand ticking" : "big-hand"}></div>
            </div>
            <div>
                {increments}
            </div>
        </div>
    </div>);
    return (content);
}