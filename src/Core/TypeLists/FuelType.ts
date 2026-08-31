abstract class FuelType {
    public static URANIUM235 = 'uranium235';
    public static PLUTONIUM = 'plutonium';
    public static THORIUM = 'thorium';
    public static GRAPHITE = 'graphite';
    public static ALL = [
        this.URANIUM235,
        this.PLUTONIUM,
        this.THORIUM,
        this.GRAPHITE,
    ];

    public static isValidFuelType(fuelType: string) {
        return this.ALL.includes(fuelType);
    }
}

export default FuelType;