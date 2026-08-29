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

    return <div className="flex flex-col-reverse">
        {queuedActions.map((actionDescription: string, index) => (
            <div key={index}>{actionDescription}</div>
        ))}
    </div>
}