import React, { Fragment, useEffect } from "react";
import Producto from "./Producto";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { obtenerProductosAction } from "../actions/productoActions";

const Productos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Consultar la API
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
    // es lint-disable-next-line
  }, []);

  // obtener el state
  const productos = useSelector((state) => state.productos);
  const error = useSelector((state) => state.productos.error);
  const cargando = useSelector((state) => state.productos.loading);

  return (
    <Fragment>
      <h2 className="text-center my-5">Listado de Productos</h2>

      {error ? (
        <p className="font-weight-bold alert alert-danger text-center mt-3">
          Hubo un error
        </p>
      ) : null}

      {cargando ? <p className="text-center">Cargando...</p> : null}

      <table className="table table-triped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos?.productos?.length > 1
            ? productos.productos.map((producto) => (
                <Producto key={producto.id} producto={producto} />
              ))
            : "no hay productos"}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Productos;
