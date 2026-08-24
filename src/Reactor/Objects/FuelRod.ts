import FuelTypes from "../../Core/TypeLists/FuelTypes";
import type TemperatureSensitivity from "../Interfaces/TemperatureSensitivityInterface";

class FuelRod implements TemperatureSensitivity {
    label: string;
    temperature: number;
    minimumTemperature: number;
    maximumTemperature: number;
    fuelType: string;

    constructor(fuelType: string = null) {
        this.temperature = 0;
        this.minimumTemperature = 0;
        this.maximumTemperature = 0;
        if(FuelTypes.ALL.includes(fuelType)) {
            this.fuelType = fuelType
            this.label = fuelType.substring(0,1);
        } else {
            this.fuelType = null;
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