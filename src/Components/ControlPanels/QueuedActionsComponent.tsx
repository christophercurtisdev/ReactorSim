import { useEffect, useState } from "react";
import Game from "../../Core/Game";
import CRTCopmonent from "../Partials/CRTComponent";

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

    let content = (<div className="flex flex-col-reverse font-mono font-thin mx-1">
                {queuedActions.map((actionDescription: string, index) => (
                    <div key={index} className="crt-text text-sm">{actionDescription}</div>
                ))}
            </div>);

    return <CRTCopmonent content={content} />
}