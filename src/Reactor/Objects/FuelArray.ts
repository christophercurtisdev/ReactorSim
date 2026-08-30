import type Ticks from "../../Core/Interfaces/TicksInterface";
import FuelType from "../../Core/TypeLists/FuelType";
import type TemperatureSensitivity from "../Interfaces/TemperatureSensitivityInterface";
import FuelRod from "./FuelRod";

class FuelArray implements TemperatureSensitivity, Ticks {
    temperature: number;
    minimumTemperature: number;
    maximumTemperature: number;
    mass: number;
    ambientTemperature: number;
    temperatureBleedRate: number;

    fuelRods: Array<Array<FuelRod>> = new Array<Array<FuelRod>>;

    rows: number;
    columns: number;

    constructor() {
        this.temperature = 0;
        this.minimumTemperature = 0;
        this.maximumTemperature = 0;
        this.mass = 50;
        this.ambientTemperature = 30;
        this.temperatureBleedRate = 1;
        
        this.rows = 5;
        this.columns = 5;

        for(let column = 0; column < this.columns; column ++) {
            this.fuelRods[column] = new Array<FuelRod>();
            for(let row = 0; row < this.rows; row++) {
                this.fuelRods[column][row] = new FuelRod;
            }
        }
    }

    tick(): void {
        this.updateTemperature();
    }

    onExceedMaximumTemperature(): void {
        
    }

    onExceedMinimumTemperature(): void {
        
    }

    updateTemperature(): void {
        let heatChange = 0;
        this.listFuelRods().forEach((rod) => {
            // hotter or colder * mass differential * heat differential
            // The hotter colder and heat diff component can be combined but I like how this looks more.
            heatChange += Math.sign(rod.temperature - this.temperature) * (rod.mass / this.mass) * ((Math.abs(rod.temperature - this.temperature) / 10));
        });
        heatChange += (Math.sign(this.ambientTemperature - this.temperature) * this.temperatureBleedRate);
        console.log(this.temperature)
        this.temperature += heatChange;
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
                let rodNumber = (column * this.rows) + row;
                let validatedFuelType = fuelType ?? FuelType.ALL[Math.floor(Math.random() * FuelType.ALL.length)];
                this.fuelRods[column][row] = new FuelRod(validatedFuelType, rodNumber);
                this.fuelRods[column][row].label = String(column) + String(row) + validatedFuelType.substring(0,1);
            }
        }
    }
}

export default FuelArray;