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
    if (estado === "TX") 
    {
        return precioNeto * 0.0625;
    }
    if (estado === "AL") 
    {
        return precioNeto * 0.04;   
    }
    return 0;
}