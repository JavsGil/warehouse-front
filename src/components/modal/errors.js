const validationRulesByTitle = {
    "Crear Articulo": {
      nombre: {
        required: true,
        errorMessage: "Ingrese el nombre",
      },
      talla: {
        required: true,
        numeric: true,
        errorMessage: "La talla debe ser numérica",
      },
    },
    "Crear Empresa": {
      nombre: {
        required: true,
        errorMessage: "Ingrese el nombre",
      },
      direccion: {
        required: true,
        errorMessage: "Ingrese la dirección",
      },
      nit: {
        required: true,
        errorMessage: "Ingrese el NIT",
      },
      telefono: {
        required: true,
        numeric: true,
        errorMessage: "El teléfono debe ser numérico",
      },
    },
    // Agregar más reglas de validación según sea necesario
  };
  export { validationRulesByTitle };