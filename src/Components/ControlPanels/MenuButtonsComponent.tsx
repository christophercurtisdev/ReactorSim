import { useEffect, useState } from "react";
import Game from "../../Core/Game";
import SoftRecessLatchingButton from "./SoftRecessLatchingButtonComponent";

function pauseGame(): void {
    Game.getInstance().pause();
}

function resumeGame(): void {
    Game.getInstance().resume();
}

export default function MenuButtonsComponent() {
    const [gameRunning, setGameRunning] = useState(false);

    function toggleRunning() {
        return Game.getInstance().getIsRunning() ? pauseGame() : resumeGame();
    }

    useEffect(() => {
        // Subscribe to stop start updates
        const unsubscribeFromStopStartUpdates = Game.getInstance().listenToStopStartEvents((isRunning) => {
            setGameRunning(isRunning);
        });

        return () => {
            // Unsubscribe from this component
            unsubscribeFromStopStartUpdates();
        };
    }, []);

    let playSvg = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Layer 1</title><path fill="#44aa44" d="M0 11.95C0 5.35 5.35 0 11.95 0S23.9 5.35 23.9 11.95 18.55 23.9 11.95 23.9 0 18.55 0 11.95m8.79-5.09c-.35.2-.57.57-.57.98v8.22c0 .41.22.78.57.98s.78.19 1.13-.02l6.72-4.11c.33-.21.54-.56.54-.96 0-.39-.21-.75-.54-.96L9.92 6.88c-.35-.21-.78-.22-1.13-.02v.01z"/></svg>);
    
    return (
        <div className="flex h-full justify-between p-2">
            <SoftRecessLatchingButton onCheck={toggleRunning} onUncheck={toggleRunning} checked={gameRunning} icon={playSvg}/>
        </div>
    );
}
