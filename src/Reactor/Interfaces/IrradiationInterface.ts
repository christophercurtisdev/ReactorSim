export default interface Irradiation {
    roentgen: number;
    maximumRoentgen: number;
    updateRoentgen(): void;
    onExceedMaximumRoentgen(): void;
}