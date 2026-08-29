export default interface Action {
    ticks: number;
    action: () => void;
}