import type Ticks from "../../Core/Interfaces/TicksInterface";
import FuelArray from "./FuelArray";

class Reactor implements Ticks {
    fuelArray: FuelArray;
    private radiation: number;
    private heat: number;
    
    constructor() {
        this.fuelArray = new FuelArray();
        this.fuelArray.fillWith();
        this.radiation = 0;
    }

    tick(currentTick?: number): void {
        this.fuelArray.listFuelRods().forEach((rod) => {
            rod.tick();
        });
        this.fuelArray.tick();
    }

    getFuelArray(): FuelArray {
        return this.fuelArray;
    }
}

export default Reactor;