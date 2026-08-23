import FuelTypes from "../../Core/TypeLists/FuelTypes";
import type { TemperatureSensitivity } from "../Interfaces/TemperatureSensitivityInterface";

class FuelRod implements TemperatureSensitivity {
    temperature: number;
    minimumTemperature: number;
    maximumTemperature: number;
    fuelType: string;

    constructor(fuelType: string = null) {
        this.temperature = 0;
        this.minimumTemperature = 0;
        this.maximumTemperature = 0;
        (FuelTypes.ALL.includes(fuelType)) ? this.fuelType = fuelType : this.fuelType = null;
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