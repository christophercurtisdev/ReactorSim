import FuelArray from "../Reactor/Objects/FuelArray";
import FuelTypes from "./TypeLists/FuelTypes";

class Game {
    private static instance: Game | null = null;

    private radiation: number;
    private powerGenerated: number;
    private fuelArray: FuelArray | null;

    private constructor() {
        // Maybe move reactor components to dedicated Reactor object if Game gets too big
        this.fuelArray = new FuelArray();
        this.fuelArray.fillWith(FuelTypes.URANIUM235);

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

    }

    play() {

    }

    getFuelArray(): FuelArray {
        return this.fuelArray;
    }
}

export default Game;