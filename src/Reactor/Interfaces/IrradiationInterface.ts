export interface Irradiation {
    roentgen: number;
    maximumRoentgen: number;
    onEsceedMaximumRoentgen(): void;
}