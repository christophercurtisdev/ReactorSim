import FormulaSolver from "../../Core/FormulaSolver";
import type FuelTypeInterface from "../../Core/Interfaces/FuelTypeInterface";
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
    heatTransferImpedance: number;

    fuelRods: Array<Array<FuelRod>> = new Array<Array<FuelRod>>;

    rows: number;
    columns: number;

    constructor() {
        this.temperature = 30;
        this.minimumTemperature = 0;
        this.maximumTemperature = 100;
        this.mass = 50;
        this.ambientTemperature = 30;
        this.temperatureBleedRate = 1;
        this.heatTransferImpedance = 10;
        
        this.rows = 5;
        this.columns = 5;

        for(let column = 0; column < this.columns; column ++) {
            this.fuelRods[column] = new Array<FuelRod>();
            for(let row = 0; row < this.rows; row++) {
                this.fuelRods[column][row] = new FuelRod(this);
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
            if (rod.getEngaged()) {
                // hotter or colder * mass differential * (heat differential / heat transfer impedance)
                // The hotter colder and heat diff component can be combined but I like how this looks more.
                heatChange += Math.sign(rod.temperature - this.temperature) * (rod.mass / this.mass) * ((Math.abs(rod.temperature - this.temperature) / this.heatTransferImpedance));
            }
        });
        heatChange += FormulaSolver.calculateTemperatureBleedRate(this);
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

    fillWith(fuelType: FuelTypeInterface = null) {
        for(let column = 0; column < this.columns; column ++) {
            for(let row = 0; row < this.rows; row++) {
                let rodNumber = (column * this.rows) + row;
                let validatedFuelType: FuelTypeInterface = fuelType ?? FuelType.ALL[Math.floor(Math.random() * FuelType.ALL.length)];
                this.fuelRods[column][row] = new FuelRod(this, validatedFuelType, rodNumber);
                this.fuelRods[column][row].label = String(column) + String(row) + validatedFuelType.name.substring(0,1);
            }
        }
    }

    setRod(rod: FuelRod) {
        for(let column = 0; column < this.columns; column ++) {
            for(let row = 0; row < this.rows; row++) {
                if (this.fuelRods[column][row].rodNumber == rod.rodNumber) {
                    this.fuelRods[column][row] = rod;
                    return;
                }
            }
        }    
    }

    getRod(rodNumber: number): FuelRod {
        for(let column = 0; column < this.columns; column ++) {
            for(let row = 0; row < this.rows; row++) {
                if (this.fuelRods[column][row].rodNumber == rodNumber) {
                    return this.fuelRods[column][row];
                }
            }
        }
    }

    getRodNeighbours(rodNumber: number): Array<FuelRod | null> {
        for(let column = 0; column < this.columns; column ++) {
            for(let row = 0; row < this.rows; row++) {
                if (this.fuelRods[column][row].rodNumber == rodNumber) {
                    let rods = [];
                    rods[0] = row > 0 ? this.fuelRods[column][row - 1] : null;
                    rods[1] = this.columns-1 > column ? this.fuelRods[column + 1][row] : null;
                    rods[2] = this.rows-1 > row ? this.fuelRods[column][row + 1] : null;
                    rods[3] = column > 0 ? this.fuelRods[column - 1][row] : null;

                    return rods;
                }
            }
        }
    }
}

export default FuelArray;