import FuelArray from "../Reactor/Objects/FuelArray";
import FuelRod from "../Reactor/Objects/FuelRod";
import Reactor from "../Reactor/Objects/Reactor";
import ActionQueue from "./ActionQueue";
import GameRound from "./GameRound";
import type QueueAction from "./Interfaces/QueueActionInterface";
import TickSystem from "./TickSystem";
import FuelType from "./TypeLists/FuelType";

class Game {
    private static instance: Game | null = null;

    private reactor: Reactor;
    private actionQueue: ActionQueue;
    private currentGameRound: GameRound;

    private constructor() {
        this.reactor = new Reactor();

        this.actionQueue = new ActionQueue();

        let rod1 = new FuelRod(this.reactor.fuelArray, FuelType.GRAPHITE, 1, 'G');
        let rod5 = new FuelRod(this.reactor.fuelArray, FuelType.GRAPHITE, 5, 'G');
        let rod7 = new FuelRod(this.reactor.fuelArray, FuelType.GRAPHITE, 7, 'G');
        let rod11 = new FuelRod(this.reactor.fuelArray, FuelType.GRAPHITE, 11, 'G');
        let rod6 = new FuelRod(this.reactor.fuelArray, FuelType.URANIUM235, 6, 'U');
        this.reactor.getFuelArray().setRod(rod1);
        this.reactor.getFuelArray().setRod(rod5);
        this.reactor.getFuelArray().setRod(rod6);
        this.reactor.getFuelArray().setRod(rod7);
        this.reactor.getFuelArray().setRod(rod11);

        console.log(this.reactor.getFuelArray().getRodNeighbours(6));
    }

    static getInstance(): Game {
        if (Game.instance === null) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    tick() {
        this.reactor.tick();
        if (this.currentGameRound) {
            
            this.currentGameRound.tick();
        }
    }

    pushToActionQueue(action: QueueAction) {
        this.actionQueue.addToQueue(action);
    }

    getActionQueue(): ActionQueue {
        return this.actionQueue;
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
        return this.reactor.getFuelArray();
    }

    getReactor(): Reactor {
        return this.reactor;
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

    newRound() {
        this.currentGameRound = new GameRound();
    }

    endRound() {
        this.currentGameRound = null;
    }
}

export default Game;