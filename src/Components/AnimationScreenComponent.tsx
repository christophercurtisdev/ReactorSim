import { useEffect, useState } from "react";
import Game from "../Core/Game";
import type QueueAction from "../Core/Interfaces/QueueActionInterface";
import QueueActionType from "../Core/TypeLists/QueueActionType";

export default function AnimationScreenComponent() {
    const [enableAnimation, setEnableAnimation] = useState(Game.getInstance().getIsRunning());
    const [currentAction, setCurrentAction] = useState({ action: () => {}, ticks: 0, description: '', actionType: -1 });

    useEffect(() => {
        // Subscribe to stop start updates
        const unsubscribeFromStopStartUpdates = Game.getInstance().listenToStopStartEvents((isRunning) => {
            setEnableAnimation(isRunning);
        });

        const unsubscribeFromCurrentActionChanges = Game.getInstance().getActionQueue().listenToCurrentActionChanges((action: QueueAction) => {
            let tempAction;
            if(action == null) { 
                tempAction = { action: () => {}, ticks: 0, description: '', actionType: -1 } 
            } else {
                tempAction = { action: action.action, ticks: action.ticks, description: action.description, actionType: action.actionType }
            }
            setCurrentAction(tempAction);
        });

        return () => {
            // Unsubscribe from this component
            unsubscribeFromStopStartUpdates();
            unsubscribeFromCurrentActionChanges();
        };
    }, []);

    // let icon = currentAction.actionType == QueueActionType.DISENGAGE_FUEL_ROD ? '&#x2191;' : '&#x2193;';
    let icon = '';
    switch (currentAction.actionType) {
        case QueueActionType.ENGAGE_FUEL_ROD:
            icon = '&#x2193;'
            break;
        case QueueActionType.DISENGAGE_FUEL_ROD:
            icon = '&#x2191;'
            break;
        default:
            icon = '';
    }

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
                <div className="absolute flex justify-center items-center flex-col font-mono">
                    <span>{currentAction.description}</span>
                    <span className="text-7xl" dangerouslySetInnerHTML={{ __html: icon }}></span>
                </div>
            </div>
        </div>
    );
}