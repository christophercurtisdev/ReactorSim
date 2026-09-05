export default interface Irradiation {
    roentgen: number;
    maximumRoentgen: number;
    updateRoentgen(): void;
    hasExceededMaxRoentgen(): boolean;
}