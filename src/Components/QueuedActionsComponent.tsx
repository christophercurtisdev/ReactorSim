import { useEffect, useState } from "react";
import Game from "../Core/Game";

export default function QueuedActionsComponent() {
    const [queuedActions, setQueuedActions] = useState([]);

    const actionQueue = Game.getInstance().getActionQueue();

    useEffect(() => {
        const unsubscribeFromTickUpdates = actionQueue.listenToActionQueueChanges(() => {
            let actionsList = [];
            actionQueue.getActions().forEach((action) => {
                actionsList.unshift(action.description);
            });
            setQueuedActions(actionsList);
        });

        return () => {
            unsubscribeFromTickUpdates();
        };
    }, []);

    return <div className="crt h-full">
        <div className="flex flex-col-reverse font-mono font-thin">
            {queuedActions.map((actionDescription: string, index) => (
                <div key={index} className="crt-text">{actionDescription}</div>
            ))}
        </div>
    </div>
}