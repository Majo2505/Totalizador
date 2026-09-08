import {calcularPrecioNeto, calcularImpuesto} from "./totalizador.js";

describe("CalcularPrecioNeto", () => {
    it("deberia calcular el precio neto multiplicando cantidad por precio", () => {
        expect(calcularPrecioNeto(20, 3)).toEqual(60);
    });
});

describe("CalcularImpuesto", () => {
    it("deberia calcular el impuesto del 6.65% para el estado de UT", () => {
        expect(calcularImpuesto(100, "UT")).toEqual(6.65);
    });
    it("deberia calcular el impuesto del 8.00% para el estado de NV", () => {
        expect(calcularImpuesto(100, "NV")).toEqual(8.00);
    });
    it("deberia calcular el impuesto del 8.00% para el estado de NV", () => {
        expect(calcularImpuesto(100, "NV")).toEqual(8.00);
    });
    it("deberia calcular el impuesto del 6.25% para el estado de TX", () => {
        expect(calcularImpuesto(100, "TX")).toEqual(6.25);
    });
    it("deberia calcular el impuesto del 4.00% para el estado de AL", () => {
        expect(calcularImpuesto(100, "AL")).toEqual(4);
    });
});

