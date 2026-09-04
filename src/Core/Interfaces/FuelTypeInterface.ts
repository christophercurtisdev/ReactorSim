export default interface FuelTypeInterface {
    id: number,
    name: string,
    nri: number, // Neighbouring Radiation Impact
    rcr: number, // Roentgen Change Rate (per tick)
}