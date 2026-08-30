import type Parabola from "./Interfaces/ParabolaInterface";
import type Sigmoid from "./Interfaces/SigmoidInterface";

abstract class CorrelationSolver {

    /**
     * a / ( 1 + ( e^(b - cx) ) ) )
     * @param x 
     * @param a 
     * @param b 
     * @param c 
     * @returns 
     */
    static sigmoid({x, a = 1, b = 0, c = 10}: Sigmoid): number {
        let y = a / ( 1 + (Math.pow(Math.E,b - (c*x))));
        return y;
    }

    /**
     * ax^exponent + bx + c
     * @param x 
     * @param a 
     * @param b 
     * @param c 
     * @returns 
     */
    static parabola({x, exponent = 2, a = 1, b = 0, c = 0}: Parabola): number {
        let y = Math.pow(a * x, exponent) + (b*x) + c;
        return y;
    }
}

export default CorrelationSolver;