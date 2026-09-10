import {calcularPrecioNeto, calcularImpuesto, calcularDescuento} from "./totalizador.js";

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
    it("deberia calcular el impuesto del 6.25% para el estado de TX", () => {
        expect(calcularImpuesto(100, "TX")).toEqual(6.25);
    });
    it("deberia calcular el impuesto del 4.00% para el estado de AL", () => {
        expect(calcularImpuesto(100, "AL")).toEqual(4);
    });
    it("deberia calcular el impuesto del 8.25% para el estado de CA", () => {
        expect(calcularImpuesto(100, "CA")).toEqual(8.25);
    });
});

describe("CalcularDescuento", () => {
    it("deberia calcular el descuento del 0% para compras menores a 1000", () => {
        expect(calcularDescuento(500)).toEqual(0);
    });
    it("deberia calcular el descuento del 3% para compras iguales o mayores a 1000 y menores a 3000", () => {
        expect(calcularDescuento(1000)).toEqual(30);
    });
    it("deberia calcular el descuento del 5% para compras iguales o mayores a 3000 y menores a 7000", () => {
        expect(calcularDescuento(3000)).toEqual(150);
    });
    it("deberia calcular el descuento del 7% para compras iguales o mayores a 7000 y menores a 10000", () => {
        expect(calcularDescuento(7000)).toEqual(490);
    });
    it("deberia calcular el descuento del 10% para compras iguales o mayores a 10000 y menores a 30000", () => {
        expect(calcularDescuento(10000)).toEqual(1000);
    });
    it("deberia calcular el descuento del 15% para compras iguales o mayores a 30000", () => {
        expect(calcularDescuento(30000)).toEqual(4500);
    });
});
describe("CalcularPrecioNeto - Validaciones", () => {
    it("deberia retornar 'Cantidad invalida' si la cantidad es igual a cero", () => 
    {
        expect(calcularPrecioNeto(0, 10)).toEqual("Cantidad invalida");
    });
    it("deberia retornar 'Cantidad invalida' si la cantidad es menor a cero", () => {
        expect(calcularPrecioNeto(-5, 10)).toEqual("Cantidad invalida");
    });
    it("deberia retornar 'Precio invalido' si el precio es igual a cero", () => {
        expect(calcularPrecioNeto(10, 0)).toEqual("Precio invalido");
    });
    it("deberia retornar 'Precio invalido' si el precio es menor a cero", () => {
        expect(calcularPrecioNeto(10, -5)).toEqual("Precio invalido");
    });
    it("deberia retornar 'Ingresar cantidad' si la cantidad esta vacia", () => {
        expect(calcularPrecioNeto("", 10)).toEqual("Ingresar cantidad");
        expect(calcularPrecioNeto(null, 10)).toEqual("Ingresar cantidad");
        expect(calcularPrecioNeto(undefined, 10)).toEqual("Ingresar cantidad");
    });
    it("deberia retornar 'Ingresar precio' si el precio esta vacio", () => {
        expect(calcularPrecioNeto(10, "")).toEqual("Ingresar precio");
        expect(calcularPrecioNeto(10, null)).toEqual("Ingresar precio");
        expect(calcularPrecioNeto(10, undefined)).toEqual("Ingresar precio");
    });
    it("deberia retornar 'Formato invalido' si la cantidad no es un numero", () => {
        expect(calcularPrecioNeto("abc", 10)).toEqual("Formato invalido");
        expect(calcularPrecioNeto(NaN, 10)).toEqual("Formato invalido");
    }); 
});
