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
        "Material de escritorio": 0.00,
        Muebles: 0.03,
        Electronicos: 0.04,
        Vestimenta: 0.02,
        Varios: 0.00
    };
    const tasa = impuestosCategoria[categoria];
    return Number((precioNeto * tasa).toFixed(2));
}

export function calcularDescuentoCategoria(precioNeto, categoria) {
    const descuentosCategoria = {
        Alimentos: 0.02,
        "Bebidas alcoholicas": 0.00,
        "Material de escritorio": 0.015,
        Muebles: 0.00,
        Electronicos: 0.01,
        Vestimenta: 0.00,
        Varios: 0.00
    };
    const tasa = descuentosCategoria[categoria];
    return Number((precioNeto * tasa).toFixed(2));
}

export function calcularCostoEnvio(pesoVolumetrico, cantidad) {
    if (pesoVolumetrico === "" || pesoVolumetrico === null || pesoVolumetrico === undefined) {
        return "Ingresar peso";
    }

    const peso = Number(pesoVolumetrico);
    const cant = Number(cantidad);

    if (Number.isNaN(peso)) {
        return "Formato invalido";
    }
    if (peso < 0) {
        return "Peso invalido";
    }
    

    let tarifaPorUnidad = 0;
    if (peso <= 10) {
        tarifaPorUnidad = 0;
    }
    else if (peso <= 20) {
        tarifaPorUnidad = 3.5;
    }
    else if (peso <= 40) {
        tarifaPorUnidad = 5.0;
    }
    else if (peso <= 80) {
        tarifaPorUnidad = 6.0;
    }
    else if (peso <= 100) {
        tarifaPorUnidad = 6.5;
    }
    else if (peso <= 200) {
        tarifaPorUnidad = 8.0;
    }
    else {
        tarifaPorUnidad = 9.0;
    }
    return Number((tarifaPorUnidad * cant).toFixed(2));
}

export function calcularDescuentoEnvioCliente(costoEnvio, tipoCliente) {
    const descuentosEnvio = {
        Normal: 0.00,
        Recurrente: 0.005,
        "Antiguo Recurrente": 0.01,
        Especial: 0.015
    };

    const porcentaje = descuentosEnvio[tipoCliente] || 0;
    return Number((costoEnvio * porcentaje).toFixed(2));
}

export function calcularDescuentoFijoCliente(precioNeto, categoria, tipoCliente) {
    const reglasDescuentoFijo = [
        { tipoCliente: "Recurrente", categoria: "Alimentos", minPrecioNeto: 3000, descuento: 100 },
        { tipoCliente: "Especial", categoria: "Electronicos", minPrecioNeto: 7000, descuento: 200 }
    ];

    const reglaAplicada = reglasDescuentoFijo.find(
        (regla) =>
            regla.tipoCliente === tipoCliente &&
            regla.categoria === categoria &&
            precioNeto > regla.minPrecioNeto
    );

    return reglaAplicada ? reglaAplicada.descuento : 0;
}

export function obtenerDesglose({
    cantidad,
    precio,
    estado,
    categoria,
    pesoVolumetrico,
    tipoCliente
}) {
    const cant = Number(cantidad);
    const prec = Number(precio);
    const precioNeto = Number((cant * prec).toFixed(2));

    const descuentoMonto = calcularDescuento(precioNeto);
    const descuentoCategoria = calcularDescuentoCategoria(precioNeto, categoria);
    const impuestoEstado = calcularImpuesto(precioNeto, estado);
    const impuestoCategoria = calcularImpuestoCategoria(precioNeto, categoria);
    
    const costoEnvioBase = calcularCostoEnvio(pesoVolumetrico, cant);
    const descuentoEnvioCliente = calcularDescuentoEnvioCliente(costoEnvioBase, tipoCliente);
    const costoEnvioFinal = Number((costoEnvioBase - descuentoEnvioCliente).toFixed(2));

    const descuentoFijoCliente = calcularDescuentoFijoCliente(precioNeto, categoria, tipoCliente);

    return {
        precioNeto,
        descuentoMonto,
        descuentoCategoria,
        impuestoEstado,
        impuestoCategoria,
        costoEnvioBase,
        descuentoEnvioCliente,
        descuentoFijoCliente,
        costoEnvioFinal
    };
}

export function calcularTotalizador(datosInput) {
    const desglose = obtenerDesglose(datosInput);

    const totalDescuentos = desglose.descuentoMonto + desglose.descuentoCategoria + desglose.descuentoFijoCliente;
    const totalImpuestos = desglose.impuestoEstado + desglose.impuestoCategoria;

    const precioTotal = Number((desglose.precioNeto - totalDescuentos + totalImpuestos + desglose.costoEnvioFinal).toFixed(2));

    return {
        ...desglose,
        precioTotal
    };
}