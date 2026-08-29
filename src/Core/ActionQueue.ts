import type Ticks from "./Interfaces/TicksInterface"
import type Action from "./Interfaces/ActionInterface"
import TickSystem from "./TickSystem";

class ActionQueue implements Ticks{
    private actionList: Array<Action>;
    private currentAction?: Action;
    
    constructor() {
        TickSystem.getInstance().subscribeToTickEvents(() => (this.tick()));
        this.actionList = new Array<Action>;
    }

    addToQueue(action: Action) {
        this.actionList.push(action);
    }

    processNextAction() {
        if (this.actionList[0] != null) {
            this.currentAction = this.actionList[0];
            this.actionList.shift();
        } else {
            this.currentAction = null;
        }
    }

    tick(): void {
        if (this.currentAction == null) {
            this.processNextAction();
        } else {
            if (this.currentAction.ticks > 0) {
                this.currentAction.ticks--;
                return;
            } else {
                this.currentAction.action();
                this.processNextAction();
            }
        }
    }
}

export default ActionQueue;