export function calcularPrecioNeto(cantidad, precioPorItem) 
{
    return cantidad * precioPorItem;
}

export function calcularImpuesto(precioNeto, estado) {
    const tasasImpuesto = {
        UT: 0.0665,
        NV: 0.08,
        TX: 0.0625,
        AL: 0.04,
        CA: 0.0825
    };
    const tasa = tasasImpuesto[estado] || 0;
    return precioNeto * tasa;
}