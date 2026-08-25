import FuelType from "../../Core/TypeLists/FuelType";
import type Irradiation from "../Interfaces/IrradiationInterface";
import type TemperatureSensitivity from "../Interfaces/TemperatureSensitivityInterface";

class FuelRod implements TemperatureSensitivity, Irradiation {
    label: string;
    temperature: number;
    minimumTemperature: number;
    maximumTemperature: number;
    mass: number;

    roentgen: number;
    maximumRoentgen: number;

    fuelType: string;
    rodNumber: number;

    constructor(fuelType: string = null, rodNumber: number = 0) {
        this.temperature = 0;
        this.minimumTemperature = 0;
        this.maximumTemperature = 0;
        this.mass = 0;

        if(FuelType.isValidFuelType(fuelType)) {
            this.fuelType = fuelType
            this.rodNumber = rodNumber;
            this.label = fuelType.substring(0,1) + this.rodNumber;
        } else {
            this.fuelType = null;
            this.label = null;
        }
    }

    onEsceedMaximumRoentgen(): void {
        console.log("Roentgen Exceeded in Fuel Rod");
    }

    onExceedMaximumTemperature(): void {
        console.log("Max Temp Exceeded in Fuel Rod");
    }

    onExceedMinimumTemperature(): void {
        console.log("Min Temo Exceeded in Fuel Rod");
    }

    updateTemperature(): void {
        this.temperature = 0;
    }
}

export default FuelRod;