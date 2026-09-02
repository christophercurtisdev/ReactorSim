import CorrelationSolver from "../../Core/CorrelationSolver";
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

    fuelType: string;
    rodNumber: number;

    fuelArray: FuelArray;

    private engaged: boolean = false;

    constructor(fuelArray: FuelArray, fuelType: string = null, rodNumber: number = 0, label: string = null) {
        this.temperature = 40;
        this.ambientTemperature = 40;
        this.minimumTemperature = 0;
        this.maximumTemperature = 100;
        this.mass = 1;
        this.roentgen = 1;
        this.maximumRoentgen = 50;
        this.fuelArray = fuelArray;
        this.temperatureBleedRate = 0.05;

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

    updateRoentgen(): void {
        // TEST VALUES
        let heatImpact = this.heatRoentgenImpact();
        let controlRodImpact = this.controlRodRoentgenImpact();
        let newRoentgen = this.roentgen + heatImpact + controlRodImpact;
        this.roentgen = newRoentgen > 0 ? newRoentgen : 0;
    }

    private heatRoentgenImpact(normalised: boolean = true) {
        // Normalise heat
        let x;
        if (normalised) {
            let heatSpread = this.maximumTemperature - this.minimumTemperature;
            let relativeTemperature = this.temperature - this.minimumTemperature;
            x = relativeTemperature / heatSpread;
        } else {
            x = 0; // Dunno how to do none normalised heat yet, not needed in my current line of thinking though
        }

        // Heat Parabola
        let heatParabolaParameters = {x: x, exponent: 4, a: 1, b: 0,c: 0};
        
        let heatImpact = CorrelationSolver.parabola(heatParabolaParameters);
        return heatImpact;
    }

    private controlRodRoentgenImpact(normalised: boolean = true) {
        let engagedNeighbours = this.fuelArray.getRodNeighbours(this.rodNumber).filter((rod) => rod == null ? false : rod.getEngaged()).length;

        // Normalise neighbours (eg, 1 control neighbour = 0.25, 3 control neighbours = 0.75, 4 control neighbours = 1)
        let x = normalised ? engagedNeighbours / 4 : engagedNeighbours; 

        // Control Rod Sigmoid
        let controlRodSigmoidParameters = {x: x, a: -1.05, b: 4.5, c: -8.9, d: 0.05};

        let controlRodImpact = CorrelationSolver.sigmoid(controlRodSigmoidParameters);
        return controlRodImpact;
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
            this.temperature += this.roentgenTemperatureImpact() - this.temperatureBleedRate;
        }
    }

    private roentgenTemperatureImpact(normalised: boolean = true): number {
        let relativeRoentgen = this.roentgen / this.maximumRoentgen;

        let radiationParabolaParameters = {x: relativeRoentgen, exponent: 5, a: 1, b: 0, c: 0}
        let radiationImpact = CorrelationSolver.parabola(radiationParabolaParameters);
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