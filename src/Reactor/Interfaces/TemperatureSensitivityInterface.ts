export default interface TemperatureSensitivity {
    temperature: number;
    minimumTemperature: number;
    maximumTemperature: number;
    mass: number;
    ambientTemperature: number;
    temperatureBleedRate: number;
    onExceedMaximumTemperature(): void;
    onExceedMinimumTemperature(): void;
    updateTemperature(): void;
}