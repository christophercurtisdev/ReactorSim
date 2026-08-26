import Game from "../Core/Game";
import SoftRecessLatchingButton from "./SoftRecessLatchingButtonComponent";

function pauseGame(): void {
    Game.getInstance().pause();
}

function resumeGame(): void {
    Game.getInstance().resume();
}

export default function MenuButtonsComponent() {
    let pauseSvg = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Layer 1</title><path fill="#b7b7b7" d="M11.99 2.33c5.34 0 9.66 4.32 9.66 9.66s-4.32 9.66-9.66 9.66-9.66-4.32-9.66-9.66 4.32-9.66 9.66-9.66m0 21.55c6.57 0 11.89-5.32 11.89-11.89S18.56.1 11.99.1.1 5.42.1 11.99s5.32 11.89 11.89 11.89M10.5 8.65c0-.62-.5-1.11-1.11-1.11-.62 0-1.11.5-1.11 1.11v6.69c0 .62.5 1.11 1.11 1.11.62 0 1.11-.5 1.11-1.11zm5.2 0c0-.62-.5-1.11-1.11-1.11-.62 0-1.11.5-1.11 1.11v6.69c0 .62.5 1.11 1.11 1.11.62 0 1.11-.5 1.11-1.11z"/></svg>);
    let playSvg = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Layer 1</title><path fill="#b7b7b7" d="M0 11.95C0 5.35 5.35 0 11.95 0S23.9 5.35 23.9 11.95 18.55 23.9 11.95 23.9 0 18.55 0 11.95m8.79-5.09c-.35.2-.57.57-.57.98v8.22c0 .41.22.78.57.98s.78.19 1.13-.02l6.72-4.11c.33-.21.54-.56.54-.96 0-.39-.21-.75-.54-.96L9.92 6.88c-.35-.21-.78-.22-1.13-.02v.01z"/></svg>);
    let settingsSvg = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Layer 1</title><path fill="#b7b7b7" d="M9.26 1.12C9.39.47 9.97 0 10.64 0h2.63c.67 0 1.24.47 1.38 1.12l.64 3.08c.62.26 1.2.6 1.73 1L20 4.21c.63-.21 1.33.05 1.66.63l1.31 2.28c.33.58.22 1.31-.29 1.75l-2.34 2.08a8.3 8.3 0 0 1 0 2l2.35 2.09c.5.44.62 1.18.29 1.75l-1.31 2.28c-.33.58-1.03.84-1.66.63l-2.98-.99c-.53.4-1.11.73-1.73 1l-.63 3.07c-.14.66-.71 1.12-1.38 1.12h-2.63c-.67 0-1.24-.47-1.38-1.12l-.63-3.07c-.62-.26-1.2-.6-1.73-1l-2.99.99c-.63.21-1.33-.05-1.66-.63L.96 16.79c-.33-.58-.22-1.31.29-1.75l2.35-2.09a8.3 8.3 0 0 1 0-2L1.25 8.86C.75 8.42.63 7.68.96 7.11l1.31-2.28c.33-.58 1.03-.84 1.66-.63l2.98.99c.53-.4 1.11-.73 1.73-1l.64-3.07zm2.69 14.36a3.517 3.517 0 0 0 3.5-3.53 3.517 3.517 0 0 0-3.53-3.5 3.517 3.517 0 0 0-3.5 3.53 3.517 3.517 0 0 0 3.53 3.5"/></svg>);
    
    return (
        <div className="flex h-full justify-between p-2" id="menuButtonsContainer">
            <SoftRecessLatchingButton onCheck={pauseGame} onUncheck={resumeGame} checked={true} icon={pauseSvg}/>
            <SoftRecessLatchingButton onCheck={resumeGame} onUncheck={pauseGame} checked={true} icon={playSvg}/>
            <SoftRecessLatchingButton onCheck={pauseGame} onUncheck={resumeGame} checked={true} icon={settingsSvg}/>
        </div>
    );
}