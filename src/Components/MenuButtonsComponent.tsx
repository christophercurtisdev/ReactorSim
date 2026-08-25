import Game from "../Core/Game";
import SoftRecessLatchingButton from "./SoftRecessLatchingButtonComponent";

function pauseGame(): void {
    console.log('firing');
    Game.getInstance().pause();
}

function resumeGame(): void {
    Game.getInstance().resume();
}

export default function MenuButtonsComponent() {
    return (
        <div>
            <SoftRecessLatchingButton onCheck={pauseGame} onUncheck={resumeGame} checked={true}/>
        </div>
    );
}