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
    const [roundRunning, setRoundRunning] = useState(false);

    function toggleGameRunning() {
        return Game.getInstance().getIsRunning() ? pauseGame() : resumeGame();
    }

    function newRound() {
        return Game.getInstance().newRound();
    }

    useEffect(() => {
        // Subscribe to stop start updates
        const unsubscribeFromStopStartUpdates = Game.getInstance().listenToStopStartEvents((isRunning) => {
            setGameRunning(isRunning);
        });

        const unsubscribeFromRoundStopStartEvents = Game.getInstance().listenToRoundStartStopEvents((isRunning) => {
            setRoundRunning(isRunning);
        });

        return () => {
            // Unsubscribe from this component
            unsubscribeFromStopStartUpdates();
            unsubscribeFromRoundStopStartEvents();
        };
    }, []);

    let playSvg = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Layer 1</title><path fill="#44aa44" d="M0 11.95C0 5.35 5.35 0 11.95 0S23.9 5.35 23.9 11.95 18.55 23.9 11.95 23.9 0 18.55 0 11.95m8.79-5.09c-.35.2-.57.57-.57.98v8.22c0 .41.22.78.57.98s.78.19 1.13-.02l6.72-4.11c.33-.21.54-.56.54-.96 0-.39-.21-.75-.54-.96L9.92 6.88c-.35-.21-.78-.22-1.13-.02v.01z"/></svg>);
    let nextSvg = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#44aa44" d="M512 192L334.4 192C335.4 197.2 336 202.5 336 208L336 224L512 224C520.8 224 528 216.8 528 208C528 199.2 520.8 192 512 192zM288 208C288 190.3 273.7 176 256 176L232 176C165.7 176 112 229.7 112 296L112 344C112 396.5 145.7 441.1 192.7 457.4C192.2 454.3 192 451.2 192 448C192 428 201.2 410.1 215.6 398.3C210.7 389.3 208 378.9 208 368C208 352.9 213.3 339 222 328C213.2 317 208 303.1 208 288L208 248C208 234.7 218.7 224 232 224C245.3 224 256 234.7 256 248L256 288C256 296.8 263.2 304 272 304C280.8 304 288 296.8 288 288L288 208zM256 128L256 128C274 128 290.6 134 304 144L512 144C547.3 144 576 172.7 576 208C576 243.3 547.3 272 512 272L430 272C431.3 277.1 432 282.5 432 288C432 313.3 417.3 335.2 396 345.6C398.6 352.6 400 360.1 400 368C400 388 390.8 405.9 376.4 417.7C381.3 426.7 384 437.1 384 448C384 483.3 355.3 512 320 512L232 512C139.2 512 64 436.8 64 344L64 296C64 203.2 139.2 128 232 128L256 128zM320 464C328.8 464 336 456.8 336 448C336 439.2 328.8 432 320 432L256 432C247.2 432 240 439.2 240 448C240 456.8 247.2 464 256 464L320 464zM336 288C336 293.5 335.3 298.9 334 304L368 304C376.8 304 384 296.8 384 288C384 279.2 376.8 272 368 272L336 272L336 288zM312 352L272 352C263.2 352 256 359.2 256 368C256 376.8 263.2 384 272 384L336 384C344.8 384 352 376.8 352 368C352 359.2 344.8 352 336 352L312 352z"/></svg>);

    return (
        <div className="flex h-full justify-between p-2">
            <SoftRecessLatchingButton onCheck={toggleGameRunning} onUncheck={toggleGameRunning} checked={gameRunning} icon={playSvg}/>
            <SoftRecessLatchingButton onCheck={newRound} icon={nextSvg} checked={roundRunning} />
        </div>
    );
}
