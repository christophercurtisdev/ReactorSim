import FuelArray from "../Reactor/Objects/FuelArray";
import ActionQueue from "./ActionQueue";
import type QueueAction from "./Interfaces/QueueActionInterface";
import TickSystem from "./TickSystem";

class Game {
    private static instance: Game | null = null;
    private static isRunning: boolean | null = null;

    private radiation: number;
    private powerGenerated: number;
    private fuelArray: FuelArray | null;

    private actionQueue: ActionQueue;

    private constructor() {
        // Maybe move reactor components to dedicated Reactor object if Game gets too big
        this.fuelArray = new FuelArray();
        this.fuelArray.fillWith();

        this.powerGenerated = 0;
        this.radiation = 0;

        this.actionQueue = new ActionQueue;
    }

    static getInstance(): Game {
        if (Game.instance === null) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    tick() {
        this.calculatePowerGeneration();
        this.calculateRadiation();

        this.fuelArray.tick();
    }

    pushToActionQueue(action: QueueAction) {
        this.actionQueue.addToQueue(action);
    }

    getActionQueue(): ActionQueue {
        return this.actionQueue;
    }

    calculateRadiation() {

    }

    calculatePowerGeneration() {

    }

    pause() {
        if (TickSystem.getInstance().isSystemRunning()) {
            TickSystem.getInstance().stop();
        }
    }

    resume() {
        if (!TickSystem.getInstance().isSystemRunning()) {
            TickSystem.getInstance().start();
        }
    }

    start() {
        TickSystem.getInstance().start();
    }

    stop() {
        TickSystem.getInstance().stop();
    }

    getFuelArray(): FuelArray {
        return this.fuelArray;
    }

    getIsRunning(): boolean {
        return TickSystem.getInstance().isSystemRunning()
    }

    listenToStopStartEvents(listener: (isRunning: boolean) => void) {
        return TickSystem.getInstance().subscribeToStopStartEvents(listener);
    }

    listenToTickEvents(listener: (tickCount: number) => void) {
        return TickSystem.getInstance().subscribeToTickEvents(listener);
    }
}

export default Game;