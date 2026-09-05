import type Ticks from "./Interfaces/TicksInterface"
import type QueueAction from "./Interfaces/QueueActionInterface"
import TickSystem from "./TickSystem";

class ActionQueue implements Ticks{
    private actionList: Array<QueueAction>;
    private currentQueueAction?: QueueAction;
    private queueChangesListeners: Set<(action: QueueAction, added: boolean) => void> = new Set();
    private currentActionListeners: Set<(action: QueueAction) => void> = new Set();
    
    constructor() {
        TickSystem.getInstance().subscribeToTickEvents(() => (this.tick()));
        this.actionList = new Array<QueueAction>;
    }

    private notifyQueueChangesListeners(action: QueueAction, added: boolean): void {
        this.queueChangesListeners.forEach((listener) => listener(action, added));
    }

    private notifyCurrentActionListeners(action: QueueAction): void {
        this.currentActionListeners.forEach((listener) => listener(action));
    }

    addToQueue(action: QueueAction) {
        this.actionList.push(action);
        this.notifyQueueChangesListeners(action, true);
    }

    processNextQueueAction() {
        let originalAction = this.currentQueueAction;
        if (this.actionList[0] != null) {
            this.currentQueueAction = this.actionList[0];
            this.actionList.shift();
            this.notifyQueueChangesListeners(this.currentQueueAction, true);
        } else {
            this.currentQueueAction = null;
        }
        if (originalAction != this.currentQueueAction) {
            this.notifyCurrentActionListeners(this.currentQueueAction);
        }
    }

    tick(): void {
        if (this.currentQueueAction != null) {
            this.currentQueueAction.ticks--;
            if (this.currentQueueAction.ticks <= 0) {
                this.currentQueueAction.action();
                this.processNextQueueAction();
            }
        } else {
            this.processNextQueueAction();
        }
    }

    listenToActionQueueChanges(listener: (action: QueueAction, added: boolean) => void) {
        this.queueChangesListeners.add(listener);

        // Return unsubscribe function
        return () => {
            this.queueChangesListeners.delete(listener);
        };
    }

    listenToCurrentActionChanges(listener: (action: QueueAction) => void) {
        this.currentActionListeners.add(listener);

        // Return unsubscribe function
        return () => {
            this.currentActionListeners.delete(listener);
        };
    }

    getActions() {
        return this.actionList;
    }

    isActionQueued(action: QueueAction): boolean {
        let actionObjects = this.actionList.map(queueAction => queueAction.actionObject);
        let actionTypes = this.actionList.map(queueAction => queueAction.actionType);
        return actionObjects.includes(action.actionObject) && actionTypes.includes(action.actionType);
    }
}

export default ActionQueue;