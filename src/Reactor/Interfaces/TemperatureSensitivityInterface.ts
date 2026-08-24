export default interface TemperatureSensitivity {
    temperature: number;
    minimumTemperature: number;
    maximumTemperature: number;
    mass: number;
    onExceedMaximumTemperature(): void;
    onExceedMinimumTemperature(): void;
    updateTemperature(): void;
}