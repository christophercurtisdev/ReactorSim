import FuelTypes from "../../Core/TypeLists/FuelTypes";
import type TemperatureSensitivity from "../Interfaces/TemperatureSensitivityInterface";

class FuelRod implements TemperatureSensitivity {
    label: string;
    temperature: number;
    minimumTemperature: number;
    maximumTemperature: number;
    mass: number;

    fuelType: string;
    rodNumber: number;

    constructor(fuelType: string = null, rodNumber: number = 0) {
        this.temperature = 0;
        this.minimumTemperature = 0;
        this.maximumTemperature = 0;
        this.mass = 0;

        if(FuelTypes.isValidFuelType(fuelType)) {
            this.fuelType = fuelType
            this.rodNumber = rodNumber;
            this.label = fuelType.substring(0,1) + this.rodNumber;
        } else {
            this.fuelType = null;
            this.label = null;
        }
    }

    onExceedMaximumTemperature(): void {
        
    }

    onExceedMinimumTemperature(): void {
        
    }

    updateTemperature(): void {
        this.temperature = 0;
    }
}

export default FuelRod;