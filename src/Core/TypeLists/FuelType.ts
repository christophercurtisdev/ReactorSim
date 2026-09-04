import type FuelTypeInterface from "../Interfaces/FuelTypeInterface";


abstract class FuelType {
    // nri - Neighbouring Roentgen Impact
    // rcr - Roentgen Change Rate (per tick)
    public static URANIUM235 = {id: 0, name: 'uranium235',nri: 30, rcr: 0.1};
    public static PLUTONIUM = {id: 1, name: 'plutonium',nri: 50, rcr: 0.1};
    public static THORIUM = {id: 2, name: 'thorium',nri: 10, rcr: 0.1};
    public static GRAPHITE = {id: 3, name: 'graphite',nri: -15, rcr: 0.1};
    public static ALL = [
        this.URANIUM235,
        this.PLUTONIUM,
        this.THORIUM,
        this.GRAPHITE,
    ];

    public static isValidFuelType(fuelType: FuelTypeInterface) {
        return this.ALL.includes(fuelType);
    }
}

export default FuelType;