class FuelTypes {
    public static URANIUM235 = 'uranium235';
    public static PLUTONIUM = 'plutonium';
    public static THORIUM = 'thorium';
    public static GRAPHITE = 'graphite';
    public static ALL = [
        FuelTypes.URANIUM235,
        FuelTypes.PLUTONIUM,
        FuelTypes.THORIUM,
        FuelTypes.GRAPHITE,
    ];
    public static RANDOM() {
        let random = Math.floor(Math.random() * (FuelTypes.ALL.length + 1));
        return FuelTypes.ALL[random];
    }

    public static COLOUR(fuelType: string): string | null {
        if (!FuelTypes.isValidFuelType(fuelType)) {
            return null
        }
        switch (fuelType) {
            case FuelTypes.URANIUM235:
                return 'green';
            case FuelTypes.PLUTONIUM:
                return 'yellow';
            case FuelTypes.THORIUM:
                return 'blue';
            case FuelTypes.GRAPHITE:
                return 'white'
        }
    }

    public static isValidFuelType(fuelType: string) {
        return FuelTypes.ALL.includes(fuelType);
    }
}

export default FuelTypes;