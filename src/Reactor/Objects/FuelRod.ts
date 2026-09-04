import FormulaSolver from "../../Core/FormulaSolver";
import type FuelTypeInterface from "../../Core/Interfaces/FuelTypeInterface";
import type Ticks from "../../Core/Interfaces/TicksInterface";
import FuelRodStatus from "../../Core/TypeLists/FuelRodStatus";
import FuelType from "../../Core/TypeLists/FuelType";
import type Irradiation from "../Interfaces/IrradiationInterface";
import type TemperatureSensitivity from "../Interfaces/TemperatureSensitivityInterface";
import type FuelArray from "./FuelArray";

class FuelRod implements TemperatureSensitivity, Irradiation, Ticks {
    label: string;
    temperature: number;
    minimumTemperature: number;
    maximumTemperature: number;
    mass: number;
    ambientTemperature: number;
    temperatureBleedRate: number;
    heatTransferImpedance: number;

    roentgen: number;
    maximumRoentgen: number;

    fuelType: FuelTypeInterface;
    rodNumber: number;

    fuelArray: FuelArray;

    private engaged: boolean = false;

    constructor(fuelArray: FuelArray, fuelType: FuelTypeInterface = null, rodNumber: number = 0, label: string = null) {
        this.temperature = 40;
        this.ambientTemperature = 40;
        this.minimumTemperature = 0;
        this.maximumTemperature = 1000;
        this.mass = 1;
        this.roentgen = 1;
        this.maximumRoentgen = 50;
        this.fuelArray = fuelArray;
        this.temperatureBleedRate = 0.05;

        if(FuelType.isValidFuelType(fuelType)) {
            this.fuelType = fuelType
            this.rodNumber = rodNumber;
            this.label = label ?? fuelType.name.substring(0,1) + this.rodNumber;
        } else {
            this.fuelType = null;
            this.label = null;
        }
        return this;
    }

    updateRoentgen(): void {
        // TEST VALUES
        if (this.engaged) {
            let roentgenTarget = this.controlRodRoentgenImpact() + this.fuelType.nri;
            let newRoentgen = this.roentgen + Math.sign(roentgenTarget - this.roentgen) * this.fuelType.rcr;
            this.roentgen = newRoentgen > 0 ? Math.round(newRoentgen * 100) / 100 : 0;
        }
    }

    private heatRoentgenImpact(normalised: boolean = true) {
        // Normalise heat
        let x;
        if (normalised) {
            let heatSpread = this.maximumTemperature - this.minimumTemperature;
            let relativeTemperature = this.temperature - this.minimumTemperature;
            x = relativeTemperature / heatSpread;
        } else {
            x = 0; // Dunno how to do non-normalised heat yet, not needed in my current line of thinking though
        }

        // Heat Parabola
        let heatParabolaParameters = {x: x, exponent: 2, a: 1, b: 0,c: 0};
        
        let heatImpact = FormulaSolver.parabola(heatParabolaParameters);
        return heatImpact;
    }

    private controlRodRoentgenImpact() {
        let engagedNeighboursNRI = 0;
        this.fuelArray.getRodNeighbours(this.rodNumber).forEach((rod) => {
            engagedNeighboursNRI += rod != null && rod.getEngaged() ? rod.fuelType.nri : 0;
        });

        // Normalise neighbours
        let x = engagedNeighboursNRI;

        // Control Rod Sigmoid
        // let controlRodSigmoidParameters = {x: x, a: -1.05, b: 4.5, c: -8.9, d: 0.05};

        // let controlRodImpact = FormulaSolver.sigmoid(controlRodSigmoidParameters);
        return x;
    }

    tick(): void {
        this.updateTemperature();
        this.updateRoentgen();
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
        if (this.engaged) {
            let radiationImpact = this.roentgenTemperatureImpact();
            let bleedRate = FormulaSolver.calculateTemperatureBleedRate(this);
            let newTemperature = this.temperature + radiationImpact + bleedRate;
            if (Math.abs(radiationImpact + bleedRate) > FormulaSolver.maxTemperatureChange) {
                newTemperature = FormulaSolver.maxTemperatureChange;
            }
            this.temperature = newTemperature > 0 ? newTemperature : 0;
        }
        this.temperature = Math.round(this.temperature * 100) / 100;
    }

    private roentgenTemperatureImpact(normalised: boolean = true): number {
        let relativeRoentgen = this.roentgen / this.maximumRoentgen;

        let radiationParabolaParameters = {x: relativeRoentgen, exponent: 2, a: 1, b: 0, c: 0}
        let radiationImpact = FormulaSolver.parabola(radiationParabolaParameters);
        return radiationImpact;
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