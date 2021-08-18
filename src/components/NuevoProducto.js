import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions de Redux
import { crearNuevoProductoAction } from "../actions/productoActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

const NuevoProductos = ({ history }) => {
  // state del componente
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState(0);

  // utilizar use dispatch y te crea una funcion
  const dispatch = useDispatch();

  //acceder al state del store
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  // mandar a llamar el action de productoAction
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));

  // cuando el usuario haga submit
  const submitNuevoPorducto = (e) => {
    e.preventDefault();

    // validar formulario
    if (nombre.trim() === "" || precio.trim <= 0) {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        clases: "alert alert-danger text-center text-uppercase p3",
      };

      dispatch(mostrarAlerta(alerta));

      return;
    }

    // si no hay errores
    dispatch(ocultarAlertaAction());

    // crear el nuevo producto
    agregarProducto({
      nombre,
      precio,
    });

    // redireccionar
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="cold-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>

            {alerta ? <p className={alerta.clases}> {alerta.msg} </p> : null}

            <form onSubmit={submitNuevoPorducto}>
              <div className="form-group">
                <laber>Nombre Producto</laber>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                />
              </div>

              <div className="form-group">
                <laber>Precio Producto</laber>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  value={precio}
                  onChange={(e) => guardarPrecio(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold
                text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>

            {cargando ? <p>Cargando...</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-3 text-center">
                Hubo un error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProductos;
