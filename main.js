// botones para ver cada seccion
const botonSeccionBalance = document.getElementById("boton-seccion-balance");
const botonSeccionCategorias = document.getElementById(
  "boton-seccion-categorias"
);
const botonSeccionReportes = document.getElementById("boton-seccion-reportes");
const seccionBalance = document.getElementById("seccion-balance");
const seccionCategorias = document.getElementById("seccion-categorias");
const seccionReportes = document.getElementById("seccion-reportes");
const seccionEditarCategoria = document.getElementById(
  "seccion-editar-categoria"
);
const contenedorOperacionesInsuficientes = document.getElementById(
  "contenedor-operaciones-insuficientes"
);
const contenedorReportes = document.getElementById("contenedor-reportes");

botonSeccionBalance.addEventListener("click", () => {
  seccionBalance.style.display = "block";
  seccionCategorias.style.display = "none";
  seccionReportes.style.display = "none";
});
botonSeccionCategorias.addEventListener("click", () => {
  seccionCategorias.style.display = "block";
  seccionBalance.style.display = "none";
  seccionReportes.style.display = "none";
});
botonSeccionReportes.addEventListener("click", () => {
  seccionReportes.style.display = "flex";
  seccionCategorias.style.display = "none";
  seccionBalance.style.display = "none";
  if (!operaciones.length) {
    contenedorReportes.style.display = "none";
    contenedorOperacionesInsuficientes.style.display = "flex";
  } else {
    contenedorReportes.style.display = "block";
    contenedorOperacionesInsuficientes.style.display = "none";
  }
  reportesMes(operaciones);
  reportesCategoria(operaciones, categorias);
});
// boton para nueva operación
const botonNuevaOperacion = document.getElementById("boton-nueva-operacion");
const seccionNuevaOperacion = document.getElementById(
  "seccion-nueva-operacion"
);

botonNuevaOperacion.addEventListener("click", () => {
  seccionNuevaOperacion.style.display = "block";
  seccionReportes.style.display = "none";
  seccionCategorias.style.display = "none";
  seccionBalance.style.display = "none";
  seccionEditarOperacion.style.display = "none";
});
// botón para editar operacion
const seccionEditarOperacion = document.getElementById(
  "seccion-editar-operacion"
);

// botón para cancelar
const botonCancelarOperacion = document.getElementById(
  "boton-cancelar-operacion"
);

botonCancelarOperacion.addEventListener("click", (e) => {
  e.preventDefault();
  seccionBalance.style.display = "flex";
  seccionCategorias.style.display = "none";
  seccionReportes.style.display = "none";
  seccionNuevaOperacion.style.display = "none";
  seccionEditarOperacion.style.display = "none";
});
//Pintar,editar y eliminar categorias.
let categorias = JSON.parse(localStorage.getItem("categorias")) || [
  { nombre: "Comida", id: uuidv4() },
  { nombre: "Servicios", id: uuidv4() },
  { nombre: "Salidas", id: uuidv4() },
  { nombre: "Educación", id: uuidv4() },
  { nombre: "Transporte", id: uuidv4() },
  { nombre: "Trabajo", id: uuidv4() },
];
const botonEditarCategoria = document.getElementById("boton-editar-categoria");
const inputNombreEditarCategoria = document.getElementById(
  "input-nombre-editar-categoria"
);
const selectCategorias = document.getElementsByClassName("select-categorias");
const generarCategorias = () => {
  for (let i = 0; i < selectCategorias.length; i++) {
    const select = selectCategorias[i];
    select.innerHTML = "";
    if (select.classList.contains("filtro-categorias")) {
      select.innerHTML = "<option value='todas'>Todas</option>";
    }
    let str = "";
    categorias.forEach((categoria) => {
      const { nombre, id } = categoria;
      select.innerHTML += `<option value="${nombre}">${nombre}</option>`;
      str =
        str +
        `<div class="contenedor-span-editar-eliminar">
    <span class="span-nombre-categoria">${nombre}</span>
    <div>
      <a href="#" data-id=${id} class="link-editar-eliminar-categoria link-editar-categoria">Editar</a
      ><a href="#" data-id=${id} class="link-editar-eliminar-categoria link-eliminar-categoria"
        >Eliminar</a
      >
    </div>
  </div>`;
    });
    contenedorCategorias.innerHTML = str;
  }
  if (!Array.isArray(categorias)) {
    alertify.error("El tipo de dato es incorrecto");
  } else {
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }
  const linkEliminarCategoria = document.querySelectorAll(
    ".link-eliminar-categoria"
  );
  const linkEditarCategoria = document.querySelectorAll(
    ".link-editar-categoria"
  );
  linkEliminarCategoria.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const arregloBorrarCategoria = categorias.filter(
        (categoria) => categoria.id !== e.target.dataset.id
      );
      if (!Array.isArray(arregloBorrarCategoria)) {
        alertify.error("El tipo de dato es incorrecto");
      } else {
        localStorage.setItem(
          "categorias",
          JSON.stringify(arregloBorrarCategoria)
        );
      }
      categorias = JSON.parse(localStorage.getItem("categorias"));
      generarCategorias();
    });
  });
  linkEditarCategoria.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const categoriaParaEditar = categorias.filter(
        (categoria) => categoria.id === e.target.dataset.id
      );
      editarCategoria(categoriaParaEditar);
      botonEditarCategoria.addEventListener("click", () => {
        if (inputNombreEditarCategoria.value.trim().length == 0) {
          return alertify.error("El nombre no puede estar vacío");
        }
        categoriaParaEditar[0].nombre = inputNombreEditarCategoria.value;
        seccionCategorias.style.display = "block";
        seccionEditarCategoria.style.display = "none";
        generarCategorias();
        alertify.success("Categoria editada exitosamente");
        if (!Array.isArray(categorias)) {
          alertify.error("El tipo de dato es incorrecto");
        } else {
          localStorage.setItem("categorias", JSON.stringify(categorias));
        }
      });
    });
  });
};
const editarCategoria = (arr) => {
  seccionEditarCategoria.style.display = "block";
  seccionCategorias.style.display = "none";
  inputNombreEditarCategoria.value = arr[0].nombre;
};

// Agregar categorias
const inputNombreNuevaCategoria = document.getElementById(
  "input-nombre-nueva-categoria"
);
const botonAgregarNuevaCategoria = document.getElementById(
  "boton-agregar-nueva-categoria"
);
const contenedorCategorias = document.getElementById("contenedor-categorias");
botonAgregarNuevaCategoria.addEventListener("click", () => {
  if (inputNombreNuevaCategoria.value.trim().length === 0) {
    return alertify.error("La descripción no puede estar vacía");
  }

  const categoria = {
    nombre: inputNombreNuevaCategoria.value,
    id: uuidv4(),
  };
  categorias.push(categoria);
  inputNombreNuevaCategoria.value = "";
  alertify.success("Categoría agregada exitosamente");
  generarCategorias();
});

// Array con operaciones

let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

// Creación nueva operación

const inputNuevaOperacionDescripcion = document.getElementById(
  "input-nueva-operacion-descripcion"
);
const inputNuevaOperacionMonto = document.getElementById(
  "input-nueva-operacion-monto"
);
const selectNuevaOperacionTipo = document.getElementById(
  "select-nueva-operacion-tipo"
);
const selectNuevaOperacionCategoria = document.getElementById(
  "select-nueva-operacion-categoria"
);
const inputNuevaOperacionFecha = document.getElementById(
  "input-nueva-operacion-fecha"
);
const botonAgregarOperacion = document.getElementById(
  "boton-agregar-operacion"
);

botonAgregarOperacion.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    inputNuevaOperacionDescripcion.value.trim().length === 0 ||
    inputNuevaOperacionMonto.value <= 0
  ) {
    return alertify.error(
      "El monto no puede ser igual o menor a 0 y la descripción no puede estar vacía"
    );
  }
  const operacion = {
    id: uuidv4(),
    descripcion: inputNuevaOperacionDescripcion.value,
    monto: inputNuevaOperacionMonto.value,
    tipo: selectNuevaOperacionTipo.value,
    categoria: selectNuevaOperacionCategoria.value,
    fecha: inputNuevaOperacionFecha.value,
  };
  operaciones.push(operacion);
  seccionNuevaOperacion.style.display = "none";
  seccionBalance.style.display = "block";
  inputNuevaOperacionDescripcion.value = "";
  inputNuevaOperacionMonto.value = 0;
  selectNuevaOperacionTipo.value = "gasto";
  selectNuevaOperacionCategoria.value = "Comida";
  alertify.success("Operación agregada exitosamente");
  verOperaciones(operaciones);
  if (!Array.isArray(operaciones)) {
    alertify.error("El tipo de dato es incorrecto");
  } else {
    localStorage.setItem("operaciones", JSON.stringify(operaciones));
  }
  pintarOperaciones(operaciones);
  actualizarBalance(operaciones);
});

//Pintar operaciones sección balance, editar y eliminar operacion
const inputEditarOperacionDescripcion = document.getElementById(
  "input-editar-operacion-descripcion"
);
const inputEditarOperacionMonto = document.getElementById(
  "input-editar-operacion-monto"
);
const selectEditarOperacionTipo = document.getElementById(
  "select-editar-operacion-tipo"
);
const selectEditarOperacionCategoria = document.getElementById(
  "select-editar-operacion-categoria"
);
const inputEditarOperacionFecha = document.getElementById(
  "input-editar-operacion-fecha"
);
const botonCancelarEditarOperacion = document.getElementById(
  "boton-cancelar-editar-operacion"
);
const botonEditarOperacion = document.getElementById("boton-editar-operacion");
const operacionesNuevas = document.getElementById("operaciones-nuevas");

const pintarOperaciones = (arr) => {
  let str = "";
  arr.forEach((operacion) => {
    const { id, descripcion, categoria, fecha, monto, tipo } = operacion;
    str =
      str +
      `<div class="row d-flex my-3 py-2 rounded operacion">

        <span class="col-3 fw-bold">${descripcion}</span>
        <div class="col-3"> 
        <span class="span-categoria">${categoria}</span>
        </div>
        <span  class="col-2 text-end span-fecha">${fecha}</span>
        <span class="col-2 text-end fw-bold ${
          tipo === "ganancia" ? "ganancia-operacion" : "gasto-operacion"
        }">${monto}</span>
        <a class="col-1 text-end text-decoration-none boton-editar-operacion" data-id=${id} href="#">Editar</a></a>
        <a class="col-1 text-end text-decoration-none boton-eliminar-operacion" data-id=${id} href="#">Borrar</a>
      </div>`;
  });
  operacionesNuevas.innerHTML = str;
  const botonesEliminarOperacion = document.querySelectorAll(
    ".boton-eliminar-operacion"
  );
  const botonesEditarOperacion = document.querySelectorAll(
    ".boton-editar-operacion"
  );
  botonesEliminarOperacion.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const arregloBorrarOperacion = operaciones.filter(
        (operacion) => operacion.id !== e.target.dataset.id
      );
      if (!Array.isArray(arregloBorrarOperacion)) {
        alertify.error("El tipo de dato es incorrecto");
      } else {
        localStorage.setItem(
          "operaciones",
          JSON.stringify(arregloBorrarOperacion)
        );
      }
      operaciones = JSON.parse(localStorage.getItem("operaciones"));
      pintarOperaciones(operaciones);
      verOperaciones(operaciones);
      actualizarBalance(operaciones);
    });
  });
  botonesEditarOperacion.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const operacionParaEditar = operaciones.filter(
        (operacion) => operacion.id === e.target.dataset.id
      );
      editarOperacion(operacionParaEditar);
      botonEditarOperacion.addEventListener("click", () => {
        if (
          inputEditarOperacionDescripcion.value.trim().length === 0 ||
          inputEditarOperacionMonto.value <= 0
        ) {
          return alertify.error(
            "El monto no puede ser igual o menor a 0 y la descripción no puede estar vacía"
          );
        }
        operacionParaEditar[0].monto = inputEditarOperacionMonto.value;
        operacionParaEditar[0].descripcion =
          inputEditarOperacionDescripcion.value;
        operacionParaEditar[0].tipo = selectEditarOperacionTipo.value;
        operacionParaEditar[0].categoria = selectEditarOperacionCategoria.value;
        operacionParaEditar[0].fecha = inputEditarOperacionFecha.value;
        seccionBalance.style.display = "block";
        seccionEditarOperacion.style.display = "none";
        alertify.success("Operación editada exitosamente");
        verOperaciones(operaciones);
        if (!Array.isArray(operaciones)) {
          alertify.error("El tipo de dato es incorrecto");
        } else {
          localStorage.setItem("operaciones", JSON.stringify(operaciones));
        }
        pintarOperaciones(operaciones);
        actualizarBalance(operaciones);
      });
      botonCancelarEditarOperacion.addEventListener("click", () => {
        seccionBalance.style.display = "block";
        seccionEditarOperacion.style.display = "none";
      });
    });
  });
};
const editarOperacion = (arr) => {
  const { descripcion, monto, tipo, categoria, fecha } = arr[0];
  seccionBalance.style.display = "none";
  seccionEditarOperacion.style.display = "block";
  inputEditarOperacionDescripcion.value = descripcion;
  inputEditarOperacionMonto.value = monto;
  selectEditarOperacionCategoria.value = categoria;
  selectEditarOperacionTipo.value = tipo;
  inputEditarOperacionFecha.valueAsDate = new Date(fecha);
};
//Cambio de imagen de no hay operaciones a operaciones
const ningunaOperacion = document.getElementById("ninguna-operacion");
const contenedorOperaciones = document.getElementById("contenedor-operaciones");

const verOperaciones = (operaciones) => {
  if (!operaciones.length) {
    ningunaOperacion.style.display = "flex";
    contenedorOperaciones.style.display = "none";
  } else {
    ningunaOperacion.style.display = "none";
    contenedorOperaciones.style.display = "block";
  }
};

// Sección balance, card balance
const balanceGananciasTotales = document.getElementById(
  "balance-ganancias-totales"
);
const balanceGastosTotales = document.getElementById("balance-gastos-totales");
const balanceTotal = document.getElementById("balance-total");

const actualizarBalance = (arr) => {
  const gananciasTotales = (arr) =>
    arr
      .filter((operacion) => operacion.tipo === "ganancia")
      .reduce((prev, current) => Number(prev) + Number(current.monto), 0);
  const gastosTotales = (arr) =>
    arr
      .filter((operacion) => operacion.tipo === "gasto")
      .reduce((prev, current) => Number(prev) + Number(current.monto), 0);
  balanceGananciasTotales.innerHTML = `+$${gananciasTotales(arr)}`;
  balanceGastosTotales.innerHTML = `-$${gastosTotales(arr)}`;
  balanceTotal.innerHTML = `$${gananciasTotales(arr) - gastosTotales(arr)}`;
};

//Seccion balance, filtros
const selectFiltroTipo = document.getElementById("select-filtro-tipo");
const selectFiltroCategoria = document.getElementById(
  "select-filtro-categoria"
);
const selectFiltroOrdenar = document.getElementById("select-filtro-ordenar");

const filtros = (e) => {
  const filtroTipo = selectFiltroTipo.value;
  const filtroCategoria = selectFiltroCategoria.value;
  const filtroOrdenar = selectFiltroOrdenar.value;

  let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

  if (filtroTipo !== "todos") {
    operaciones = operaciones.filter(
      (operacion) => operacion.tipo === filtroTipo
    );
  }
  if (filtroCategoria !== "todas") {
    operaciones = operaciones.filter(
      (operacion) => operacion.categoria === filtroCategoria
    );
  }
  if (filtroOrdenar === "mas-reciente") {
    operaciones = operaciones.sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
  }
  if (filtroOrdenar === "menos-reciente") {
    operaciones = operaciones.sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    );
  }
  if (filtroOrdenar === "mayor-monto") {
    operaciones = operaciones.sort((a, b) => Number(b.monto) - Number(a.monto));
  }
  if (filtroOrdenar === "menor-monto") {
    operaciones = operaciones.sort((a, b) => Number(a.monto) - Number(b.monto));
  }
  if (filtroOrdenar === "a/z") {
    operaciones = operaciones.sort((a, b) => {
      if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
        return -1;
      }
    });
  }
  if (filtroOrdenar === "z/a") {
    operaciones = operaciones.sort((a, b) => {
      if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) {
        return -1;
      }
    });
  }
  pintarOperaciones(operaciones);
  verOperaciones(operaciones);
  actualizarBalance(operaciones);
};

selectFiltroTipo.addEventListener("change", filtros);
selectFiltroCategoria.addEventListener("change", filtros);
selectFiltroOrdenar.addEventListener("change", filtros);

// ----------------------------------------sección reportes-------------------------------------------------//
const contenedorTotalesPorMes = document.getElementById("contenedor-totales-por-mes");
const contenedorTotalesPorCategoria = document.getElementById("contenedor-totales-por-categoria");
const mayorGananciaNombre = document.getElementById("mayor-ganancia-nombre");
const mayorGananciaValor = document.getElementById("mayor-ganancia-valor");
const mayorGastoNombre = document.getElementById("mayor-gasto-nombre");
const mayorGastoValor = document.getElementById("mayor-gasto-valor");
const mayorBalanceNombre = document.getElementById("mayor-balance-nombre");
const mayorBalanceValor = document.getElementById("mayor-balance-valor");
const mayorGananciaMesNombre = document.getElementById("mayor-ganancia-mes-nombre");
const mayorGananciaMesValor = document.getElementById("mayor-ganancia-mes-valor");
const mayorGastoMesNombre = document.getElementById("mayor-gasto-mes-nombre");
const mayorGastoMesValor = document.getElementById("mayor-gasto-mes-valor");


const mesBalance = [];
const reportesMes = (arr) => {
  const mesesSinRepetir = [
    ...new Set(arr.map((operacion) => operacion.fecha.split("-")[1])),
  ].sort();
  for (let i = 0; i < mesesSinRepetir.length; i++) {
    const operacionesDelMes = arr.filter(
      (operacion) => operacion.fecha.split("-")[1] === mesesSinRepetir[i]
    );
    const gananciaDelMes = operacionesDelMes
      .filter((operacion) => operacion.tipo === "ganancia")
      .reduce((count, current) => count + Number(current.monto), 0);
    const gastosDelMes = operacionesDelMes
      .filter((operacion) => operacion.tipo === "gasto")
      .reduce((count, current) => count + Number(current.monto), 0);
    const balanceDelMes = Number(gananciaDelMes) - Number(gastosDelMes);
    obj = {
      mes: mesesSinRepetir[i],
      gasto: gastosDelMes,
      ganancia: gananciaDelMes,
      balance: balanceDelMes,
    };
    mesBalance.push(obj);
  }
};
reportesMes(operaciones);

const pintarMesReportes = (arr) => {
  let str = "";
  contenedorTotalesPorMes.innerHTML = "";
  arr.forEach(categoria => { 
    const {mes, gasto,ganancia,balance} = categoria; 
    str = str + ` <div class="row my-3 fw-semibold">
    <div class="col-md-3 text-start">${mes} </div>
    <div class="col-md-3 text-end"><span class="ganancia">${ganancia}</span></div>
    <div class="col-md-3 text-end"><span class="gasto">${gasto}</span></div>
    <div class="col-md-3 text-end"><span class="span-categoria">$${balance}</span></div>
  </div>`
    })
    contenedorTotalesPorMes.innerHTML = str;
}
pintarMesReportes(mesBalance);



const categoriasBalance = [];

const reportesCategoria = (operaciones, categorias) => {
  categorias.forEach((categoria) => {
    const cadaCategoria = operaciones.filter(
      (operacion) => operacion.categoria === categoria.nombre
    );
    const cadaCategoriaGanancia = cadaCategoria
      .filter((operacion) => operacion.tipo === "ganancia")
      .reduce((count, current) => count + Number(current.monto), 0);
    const cadaCategoriaGasto = cadaCategoria
      .filter((operacion) => operacion.tipo === "gasto")
      .reduce((count, current) => count + Number(current.monto), 0);
    const cadaCategoriaBalance =
      Number(cadaCategoriaGanancia) - Number(cadaCategoriaGasto);
    obj = {
      nombre: categoria.nombre,
      ganancia: cadaCategoriaGanancia,
      gasto: cadaCategoriaGasto,
      balance: cadaCategoriaBalance,
    };
    categoriasBalance.push(obj);
  });
};
reportesCategoria(operaciones, categorias);
const pintarCategoriasReportes = (arr) => {
  let str = "";
  contenedorTotalesPorCategoria.innerHTML = "";
  arr.forEach(categoria => { 
    const {nombre, gasto,ganancia,balance} = categoria; 
    str = str + ` <div class="row my-3 fw-semibold">
    <div class="col-md-3 text-start">${nombre} </div>
    <div class="col-md-3 text-end"><span class="ganancia">${ganancia}</span></div>
    <div class="col-md-3 text-end"><span class="gasto">${gasto}</span></div>
    <div class="col-md-3 text-end"><span class="span-categoria">$${balance}</span></div>
  </div>`
    })
    contenedorTotalesPorCategoria.innerHTML = str;
}
pintarCategoriasReportes(categoriasBalance);


const mayorGanancia = (arr) => {
  return arr.sort((a, b) => Number(b.ganancia) - Number(a.ganancia));
};

const pintarMayorGanancia = () =>{
  mayorGananciaNombre.innerHTML =`<span class="span-categoria">${mayorGanancia(categoriasBalance)[0].nombre}</span>`
  mayorGananciaValor.innerHTML = `<span class="ganancia">${mayorGanancia(categoriasBalance)[0].ganancia}</span>`
}
pintarMayorGanancia()

const mayorGasto = (arr) => {
  return arr.sort((a, b) => Number(b.gasto) - Number(a.gasto));
};
const pintarMayorGasto = () =>{
  mayorGastoNombre.innerHTML = `<span class="span-categoria">${mayorGasto(categoriasBalance)[0].nombre}</span>` 
  mayorGastoValor.innerHTML = `<span class="gasto">${mayorGasto(categoriasBalance)[0].gasto}</span>`
}
pintarMayorGasto()

const mayorBalance = (arr) => {
  return arr.sort((a, b) => Number(b.balance) - Number(a.balance));
};
const pintarMayorBalance = () =>{
  mayorBalanceNombre.innerHTML =`<span class="span-categoria">${mayorBalance(categoriasBalance)[0].nombre}</span>`
  mayorBalanceValor.innerHTML = `<span class="span-categoria">$${mayorBalance(categoriasBalance)[0].balance}</span>`
}
pintarMayorBalance()

const pintarMesMayorGanancia = () =>{
  mayorGananciaMesNombre.innerHTML = `<span class="span-categoria">${mayorGanancia(mesBalance)[0].mes}</span>`
  mayorGananciaMesValor.innerHTML = `<span class="ganancia">${mayorGanancia(mesBalance)[0].ganancia}</span>`
}
pintarMesMayorGanancia()

const pintarMesMayorGasto = () =>{
  mayorGastoMesNombre.innerHTML = `<span class="span-categoria">${mayorGasto(mesBalance)[0].mes}</span>`
  mayorGastoMesValor.innerHTML = `<span class="gasto">${mayorGasto(mesBalance)[0].gasto}</span>`
}
pintarMesMayorGasto()

// -----------------------------------------ocultar filtros----------------------------------------------------------//

const spanOcultarFiltro = document.getElementById("span-ocultar-filtro");
console.log(spanOcultarFiltro)


const inicializar = () => {
  const inputFecha = document.querySelectorAll('input[type = "date"]');
  inputFecha.forEach((input) => {
    input.valueAsDate = new Date();
  }); //buscar como poner la fecha en Argentina
  actualizarBalance(operaciones);
  generarCategorias();
  verOperaciones(operaciones);
  pintarOperaciones(operaciones);
};
window.onload = inicializar;

