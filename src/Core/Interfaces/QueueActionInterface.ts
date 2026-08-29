export default interface QueueAction {
    ticks: number;
    action: () => void;
    description: string;
    actionType: number;
}