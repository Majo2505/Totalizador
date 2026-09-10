import { calcularTotalizador } from "./totalizador.js";

const form = document.querySelector("#totalizador-form");
const cantidadInput = document.querySelector("#cantidad");
const precioInput = document.querySelector("#precio");
const estadoSelect = document.querySelector("#estado");
const categoriaSelect = document.querySelector("#categoria");
const pesoInput = document.querySelector("#peso");
const tipoClienteSelect = document.querySelector("#tipo-cliente");
const resultadoDiv = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const datosInput = {
    cantidad: cantidadInput.value,
    precio: precioInput.value,
    estado: estadoSelect.value,
    categoria: categoriaSelect.value,
    pesoVolumetrico: pesoInput.value,
    tipoCliente: tipoClienteSelect.value
  };

  const resultado = calcularTotalizador(datosInput);

  resultadoDiv.innerHTML = `
    <ul>
      <li><strong>Precio Neto:</strong> $${resultado.precioNeto}</li>
      <li><strong>Descuento por Monto:</strong> -$${resultado.descuentoMonto}</li>
      <li><strong>Descuento por Categoría:</strong> -$${resultado.descuentoCategoria}</li>
      <li><strong>Impuesto de Estado:</strong> +$${resultado.impuestoEstado}</li>
      <li><strong>Impuesto por Categoría:</strong> +$${resultado.impuestoCategoria}</li>
      <li><strong>Costo de Envío Base:</strong> $${resultado.costoEnvioBase}</li>
      <li><strong>Descuento Envío (Cliente):</strong> -$${resultado.descuentoEnvioCliente}</li>
      <li><strong>Costo de Envío Final:</strong> +$${resultado.costoEnvioFinal}</li>
      <li><strong>Descuento Fijo Especial:</strong> -$${resultado.descuentoFijoCliente}</li>
      <li><h3><strong>Precio Total Final:</strong> $${resultado.precioTotal}</h3></li>
    </ul>
  `;
});