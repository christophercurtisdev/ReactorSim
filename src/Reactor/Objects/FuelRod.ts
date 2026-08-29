import type Ticks from "../../Core/Interfaces/TicksInterface";
import FuelRodStatus from "../../Core/TypeLists/FuelRodStatus";
import FuelType from "../../Core/TypeLists/FuelType";
import type Irradiation from "../Interfaces/IrradiationInterface";
import type TemperatureSensitivity from "../Interfaces/TemperatureSensitivityInterface";

class FuelRod implements TemperatureSensitivity, Irradiation, Ticks {
    label: string;
    temperature: number;
    minimumTemperature: number;
    maximumTemperature: number;
    mass: number;

    roentgen: number;
    maximumRoentgen: number;

    fuelType: string;
    rodNumber: number;

    private engaged: boolean = false;

    constructor(fuelType: string = null, rodNumber: number = 0) {
        this.temperature = 0;
        this.minimumTemperature = 0;
        this.maximumTemperature = 100;
        this.mass = 0;

        if(FuelType.isValidFuelType(fuelType)) {
            this.fuelType = fuelType
            this.rodNumber = rodNumber;
            this.label = fuelType.substring(0,1) + this.rodNumber;
        } else {
            this.fuelType = null;
            this.label = null;
        }
        return this;
    }

    tick(): void {
        if (this.engaged) {
            this.temperature++;
        } else {
            if (this.temperature > 0) {
                this.temperature--;
            }
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

    status() {
        if (this.maximumRoentgen < this.roentgen) {
            return FuelRodStatus.IRRADIATED;
        }
        if (this.maximumTemperature < this.temperature) {
            return FuelRodStatus.HOT;
        }
        if (this.minimumTemperature > this.temperature) {
            return FuelRodStatus.COLD;
        }
        return FuelRodStatus.HEALTHY;
    }

    setEngaged(engaged: boolean) {
        this.engaged = engaged;
    }

    getEngaged(): boolean {
        return this.engaged
    }
}

export default FuelRod;