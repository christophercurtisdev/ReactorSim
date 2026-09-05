export default interface TemperatureSensitivity {
    temperature: number;
    minimumTemperature: number;
    maximumTemperature: number;
    mass: number;
    ambientTemperature: number;
    temperatureBleedRate: number;
    heatTransferImpedance: number;
    hasExceededMaxTemperature(): boolean;
    hasExceededMinTemperature(): boolean;
    updateTemperature(): void;
}