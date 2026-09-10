export function calcularPrecioNeto(cantidad, precioPorItem) 
{
    if (cantidad === "" || cantidad === null || cantidad === undefined) 
    {
        return "Ingresar cantidad";
    }
    if (precioPorItem === "" || precioPorItem === null || precioPorItem === undefined) 
    {
        return "Ingresar precio";
    }

    const cant = Number(cantidad);
    const precio = Number(precioPorItem);

    if (Number.isNaN(cant) || Number.isNaN(precio)) 
    {
        return "Formato invalido";
    }
    if (cantidad <= 0) 
    {
        return "Cantidad invalida";
    }
    if (precioPorItem <= 0) 
    {
        return "Precio invalido";
    }
    return cantidad * precioPorItem;
}

export function calcularImpuesto(precioNeto, estado) 
{
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

export function calcularDescuento(precioNeto) 
{
    const tramos = 
    [
        { limite: 30000, tasa: 0.15 },
        { limite: 10000, tasa: 0.10 },
        { limite: 7000, tasa: 0.07 },
        { limite: 3000, tasa: 0.05 },
        { limite: 1000, tasa: 0.03 }
    ];

    for (const tramo of tramos) 
    {
        if (precioNeto >= tramo.limite) 
        {
            return Number((precioNeto * tramo.tasa).toFixed(2));
        }
    }
    return 0;
}

export function calcularImpuestoCategoria(precioNeto, categoria) {
    const impuestosCategoria = 
    {
        Alimentos: 0.00,
        "Bebidas alcoholicas": 0.07,
        "Material de escritorio": 0.00
    };
    const tasa = impuestosCategoria[categoria];
    return Number((precioNeto * tasa).toFixed(2));
}

export function calcularDescuentoCategoria(precioNeto, categoria) {
    const descuentosCategoria = {
        Alimentos: 0.02,
        "Bebidas alcoholicas": 0.00,
        "Material de escritorio": 0.015
    };
    const tasa = descuentosCategoria[categoria];
    return Number((precioNeto * tasa).toFixed(2));
}