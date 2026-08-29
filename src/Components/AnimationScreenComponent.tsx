import { useEffect, useState } from "react";
import Game from "../Core/Game";
import type QueueAction from "../Core/Interfaces/QueueActionInterface";

export default function AnimationScreenComponent() {
    const [enableAnimation, setEnableAnimation] = useState(Game.getInstance().getIsRunning());
    const [currentAction, setCurrentAciton] = useState({ action: () => {}, ticks: 0, descriprion: '' });

    useEffect(() => {
        // Subscribe to stop start updates
        const unsubscribeFromStopStartUpdates = Game.getInstance().listenToStopStartEvents((isRunning) => {
            setEnableAnimation(isRunning);
        });

        const unsubscribeFromCurrentActionChanges = Game.getInstance().getActionQueue().listenToCurrentActionChanges((action: QueueAction) => {
            let tempAction = action == null ? { action: () => {}, ticks: 0, descriprion: '' } : { action: action.action, ticks: action.ticks, descriprion: action.description }
            setCurrentAciton(tempAction);
        });

        return () => {
            // Unsubscribe from this component
            unsubscribeFromStopStartUpdates();
            unsubscribeFromCurrentActionChanges();
        };
    }, []);

    return (
        <div className="justify-center items-center flex h-full">
            <div className="crt flex h-full w-full justify-center items-center">
                <div className="cube-container">
                    <div className={ enableAnimation ? "cube" : "cube stopped" }>
                        <div className={ enableAnimation ? "face front" : "face front stopped" }></div>
                        <div className={ enableAnimation ? "face back" : "face back stopped" }></div>
                        <div className={ enableAnimation ? "face right" : "face right stopped" }></div>
                        <div className={ enableAnimation ? "face left" : "face left stopped" }></div>
                        <div className={ enableAnimation ? "face top" : "face top stopped" }></div>
                        <div className={ enableAnimation ? "face bottom" : "face bottom stopped" }></div>
                    </div>
                </div>
                <div className="absolute">
                    {currentAction.descriprion}
                </div>
            </div>
        </div>
    );
}