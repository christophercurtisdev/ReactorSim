import Game from "./Game";
import type Ticks from "./Interfaces/TicksInterface";

export default class GameRound implements Ticks {
    private requiredPower: number;
    private dayLength: number;
    private remainingTicks: number;

    constructor() {
        this.requiredPower = 100;
        this.dayLength = 200;
        this.remainingTicks = this.dayLength;
    }

    tick(): void {
        this.remainingTicks--;
        if (this.remainingTicks <= 0) {
            Game.getInstance().endRound();
        }
    }
}