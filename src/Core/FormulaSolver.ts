import type TemperatureSensitivity from "../Reactor/Interfaces/TemperatureSensitivityInterface";

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

abstract class FormulaSolver {

    static maxTemperatureChange = 10;
    static maxRoentgenChange = 10;

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
        let y = (a * Math.pow(x, exponent)) + (b*x) + c;
        return y;
    }

    static calculateTemperatureBleedRate(tempObject: TemperatureSensitivity) {
        return Math.sign(tempObject.ambientTemperature - tempObject.temperature) * tempObject.temperatureBleedRate;
    }
}

export default FormulaSolver;