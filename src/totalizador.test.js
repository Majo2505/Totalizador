import {calcularPrecioNeto, calcularImpuesto} from "./totalizador.js";

describe("CalcularPrecioNeto", () => {
    it("deberia calcular el precio neto multiplicando cantidad por precio", () => {
        expect(calcularPrecioNeto(20, 3)).toEqual(60);
    });
});

describe("CalcularImpuesto", () => {
    it("deberia calcular el impuesto del 6.65% para el estado de UT", () => {
        expect(calcularImpuesto(60, "UT")).toEqual(3.99);
    });
});
