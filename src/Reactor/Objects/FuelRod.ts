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
    ambientTemperature: number;
    temperatureBleedRate: number;
    heatTransferImpotence: number;

    roentgen: number;
    maximumRoentgen: number;

    fuelType: string;
    rodNumber: number;

    private engaged: boolean = false;

    constructor(fuelType: string = null, rodNumber: number = 0, label: string = null) {
        this.temperature = 40;
        this.ambientTemperature = 40;
        this.minimumTemperature = 0;
        this.maximumTemperature = 100;
        this.mass = 1;
        this.roentgen = 1;

        if(FuelType.isValidFuelType(fuelType)) {
            this.fuelType = fuelType
            this.rodNumber = rodNumber;
            this.label = label ?? fuelType.substring(0,1) + this.rodNumber;
        } else {
            this.fuelType = null;
            this.label = null;
        }
        return this;
    }

    tick(): void {
        this.roentgen = this.engaged ? 1 : 0;
        this.updateTemperature();
    }

    onExceedMaximumRoentgen(): void {
        console.log("Roentgen Exceeded in Fuel Rod");
    }

    onExceedMaximumTemperature(): void {
        console.log("Max Temp Exceeded in Fuel Rod");
    }

    onExceedMinimumTemperature(): void {
        console.log("Min Temo Exceeded in Fuel Rod");
    }

    updateTemperature(): void {
        this.temperature = this.engaged ? 100 : 40;
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