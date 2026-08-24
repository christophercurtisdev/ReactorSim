import type TemperatureSensitivity from "../Interfaces/TemperatureSensitivityInterface";
import FuelRod from "./FuelRod";

class FuelArray implements TemperatureSensitivity {
    temperature: number;
    minimumTemperature: number;
    maximumTemperature: number;

    fuelRods: Array<Array<FuelRod>> = [];

    rows: number;
    columns: number;

    constructor() {
        this.temperature = 0;
        this.minimumTemperature = 0;
        this.maximumTemperature = 0;
        
        this.rows = 10;
        this.columns = 10;

        for(let column = 0; column < this.columns; column ++) {
            this.fuelRods[column] = new Array<FuelRod>();
            for(let row = 0; row < this.rows; row++) {
                this.fuelRods[column][row] = new FuelRod();
            }
        }
    }

    onExceedMaximumTemperature(): void {
        
    }

    onExceedMinimumTemperature(): void {
        
    }

    updateTemperature(): void {
        this.temperature = 0;
    }

    getFuelRodAtPosition(row: number, column: number) {
        return this.fuelRods[column][row];
    }

    listFuelRods(): Array<FuelRod> {
        let rods = [];
        let index = 0;
        for(let column = 0; column < this.columns; column ++) {
            for(let row = 0; row < this.rows; row++) {
                rods[index] = this.fuelRods[column][row];
                index++;
            }
        }
        return rods;
    }

    fillWith(fuelType: string = null) {
        for(let column = 0; column < this.columns; column ++) {
            for(let row = 0; row < this.rows; row++) {
                this.fuelRods[column][row] = new FuelRod(fuelType);
            }
        }
    }
}

export default FuelArray;