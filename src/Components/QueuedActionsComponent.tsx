import React, { useEffect, useState } from "react";
import Game from "../Core/Game";
import type QueueAction from "../Core/Interfaces/QueueActionInterface";

export default function QueuedActionsComponent() {
    const [queuedActions, setQueuedActions] = useState([]);

    const actionQueue = Game.getInstance().getActionQueue();

    useEffect(() => {
        const unsubscribeFromTickUpdates = actionQueue.listenToActionQueueChanges((action: QueueAction, added: boolean) => {
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

    return <div>
        {queuedActions.map((actionDescription: string, index) => (
            <div key={index}>{actionDescription}</div>
        ))}
    </div>
}