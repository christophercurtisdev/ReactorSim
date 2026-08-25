import type FuelRod from "../../Reactor/Objects/FuelRod";

abstract class FuelRodStatus {
    public static HEALTHY: number = 0;
    public static IRRADIATED: number = 1;
    public static HOT: number = 2;
    public static COLD: number = 3;

    public static getRodStatus(rod: FuelRod) {
        if (rod.minimumTemperature > rod.temperature) {
            return this.COLD;
        }
        if (rod.maximumTemperature < rod.temperature) {
            return this.HOT;
        }
        if (rod.maximumRoentgen < rod.roentgen) {
            return this.IRRADIATED;
        }
        return this.HEALTHY
    }
}

export default FuelRodStatus;