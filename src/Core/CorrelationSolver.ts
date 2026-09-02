interface Parabola {
    x: number;
    exponent?: number;
    a?: number;
    b?: number;
    c?: number;
}

interface Sigmoid {
    x: number;
    a?: number;
    b?: number;
    c?: number;
    d?: number;
}

abstract class CorrelationSolver {

    /**
     * (a / ( 1 + ( e^(b - cx) ) ) ) ) + d
     * @param x 
     * @param a 
     * @param b 
     * @param c 
     * @param d 
     * @returns 
     */
    static sigmoid({x, a = 1, b = 0, c = 10, d = 0}: Sigmoid): number {
        let y = (a / ( 1 + (Math.pow(Math.E,b + (c*x))))) + d;
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