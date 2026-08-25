import FuelArray from "../Reactor/Objects/FuelArray";
import TickSystem from "./TickSystem";

class Game {
    private static instance: Game | null = null;

    private radiation: number;
    private powerGenerated: number;
    private fuelArray: FuelArray | null;

    private constructor() {
        // Maybe move reactor components to dedicated Reactor object if Game gets too big
        this.fuelArray = new FuelArray();
        this.fuelArray.fillWith();

        this.powerGenerated = 0;
        this.radiation = 0;
    }

    static getInstance(): Game {
        if (Game.instance === null) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    tick(currentTick: number) {
        this.calculatePowerGeneration();
        this.calculateRadiation();
    }

    calculateRadiation() {

    }

    calculatePowerGeneration() {

    }

    pause() {
        TickSystem.getInstance().stop();
    }

    resume() {
        TickSystem.getInstance().start();
    }

    start() {
        TickSystem.getInstance().start();
    }

    getFuelArray(): FuelArray {
        return this.fuelArray;
    }
}

export default Game;