import type FuelTypeInterface from "../Interfaces/FuelTypeInterface";


abstract class FuelType {
    public static URANIUM235 = {id: 0, name: 'uranium235',nri: 30};
    public static PLUTONIUM = {id: 1, name: 'plutonium',nri: 50};
    public static THORIUM = {id: 2, name: 'thorium',nri: 10};
    public static GRAPHITE = {id: 3, name: 'graphite',nri: -25};
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