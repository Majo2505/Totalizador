export function calcularPrecioNeto(cantidad, precioPorItem) 
{
    return cantidad * precioPorItem;
}

export function calcularImpuesto(precioNeto, estado) {
    if (estado === "UT")

    {
        return precioNeto * 0.0665
    }
    if (estado === "NV")

    {
        return precioNeto * 0.08
    }
    return 0;
}