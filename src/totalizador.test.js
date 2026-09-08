import {calcularPrecioNeto} from "./totalizador.js";

describe("CalcularPrecioNeto", () => {
  it("deberia calcular el precio neto multiplicando cantidad por precio", () => {
    expect(calcularPrecioNeto(20, 3)).toEqual(60);
  });
});
