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
}

export default FuelTypes;