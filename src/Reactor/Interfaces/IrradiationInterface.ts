export default interface Irradiation {
    roentgen: number;
    maximumRoentgen: number;
    onExceedMaximumRoentgen(): void;
}