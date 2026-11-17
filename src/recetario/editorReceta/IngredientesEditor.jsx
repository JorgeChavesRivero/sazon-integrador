import { useState, useEffect } from 'react';
import './IngredientesEditor.css';

// Catálogo simulado interno para cumplir con la carga asíncrona requerida
const PRODUCTOS_MOCK = [
  { id: 1, nombre: 'Harina de Trigo Haz de Oros', unidad: 'gramos' },
  { id: 2, nombre: 'Chocolate Corona Tradicional', unidad: 'gramos' },
  { id: 3, nombre: 'Leche Entera Colanta', unidad: 'mililitros' },
  { id: 4, nombre: 'Galletas Ducales', unidad: 'unidades' },
  { id: 5, nombre: 'Aceite Vegetal Premier', unidad: 'mililitros' },
  { id: 6, nombre: 'Azúcar Morena Incauca', unidad: 'gramos' },
  { id: 7, nombre: 'Huevos AA', unidad: 'unidades' }
];

export default function IngredientesEditor({ ingredientes = [], onChangeIngredientes }) {
  const [catalogo, setCatalogo] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [alerta, setAlerta] = useState(null);

  // Criterio 1: Carga asíncrona mediante servicio simulado
  useEffect(() => {
    let montado = true;
    const timer = setTimeout(() => {
      if (montado) {
        setCatalogo(PRODUCTOS_MOCK);
        setCargando(false);
      }
    }, 400);

    return () => {
      montado = false;
      clearTimeout(timer);
    };
  }, []);

  const mostrarAlerta = (mensaje, tipo = 'exito') => {
    setAlerta({ mensaje, tipo });
    setTimeout(() => setAlerta(null), 3500);
  };

  const productoActual = catalogo.find(
    (item) => item.id === Number(productoSeleccionadoId)
  );

  // Criterio 3: Botón interactivo para agregar a la lista temporal
  const manejarAgregar = (e) => {
    e.preventDefault();

    if (!productoActual) {
      mostrarAlerta('Selecciona un producto válido del catálogo.', 'error');
      return;
    }

    const cantidadNumerica = parseFloat(cantidad);
    // Criterio 2: Validación numérica con min y required en HTML
    if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
      mostrarAlerta('Ingresa una cantidad válida mayor a 0.', 'error');
      return;
    }

    const yaExiste = ingredientes.some((ing) => ing.productoId === productoActual.id);
    let nuevaLista;

    if (yaExiste) {
      nuevaLista = ingredientes.map((ing) =>
        ing.productoId === productoActual.id
          ? { ...ing, cantidad: ing.cantidad + cantidadNumerica }
          : ing
      );
      mostrarAlerta(`Se sumó cantidad al ingrediente ${productoActual.nombre}.`, 'exito');
    } else {
      nuevaLista = [
        ...ingredientes,
        {
          productoId: productoActual.id,
          nombre: productoActual.nombre,
          unidad: productoActual.unidad,
          cantidad: cantidadNumerica
        }
      ];
      mostrarAlerta(`${productoActual.nombre} agregado correctamente.`, 'exito');
    }

    onChangeIngredientes(nuevaLista);
    setProductoSeleccionadoId('');
    setCantidad('');
  };

  // Criterio 3: Botón interactivo para remover ingredientes
  const manejarEliminar = (productoId, nombre) => {
    const nuevaLista = ingredientes.filter((ing) => ing.productoId !== productoId);
    onChangeIngredientes(nuevaLista);
    mostrarAlerta(`${nombre} fue removido de la lista.`, 'exito');
  };

  return (
    // Criterio 4: Clases CSS estrictamente prefijadas
    <section className="receta-editor-ingredientes">
      <h3 className="receta-editor-ingredientes__titulo">
        <i className="bi bi-basket2-fill" aria-hidden="true"></i>
        Gestión de Ingredientes
      </h3>

      {alerta && (
        <div
          className={`receta-editor-ingredientes__alerta receta-editor-ingredientes__alerta--${alerta.tipo}`}
          role="alert"
        >
          <span>
            <i
              className={`bi ${
                alerta.tipo === 'error' ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill'
              }`}
              style={{ marginRight: '0.5rem' }}
            ></i>
            {alerta.mensaje}
          </span>
          <button
            type="button"
            className="receta-editor-ingredientes__alerta-cerrar"
            onClick={() => setAlerta(null)}
            aria-label="Cerrar"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      )}

      <form className="receta-editor-ingredientes__form" onSubmit={manejarAgregar}>
        <div className="receta-editor-ingredientes__grupo">
          <label htmlFor="select-producto" className="receta-editor-ingredientes__label">
            Producto (Catálogo)
          </label>
          <select
            id="select-producto"
            className="receta-editor-ingredientes__select"
            value={productoSeleccionadoId}
            onChange={(e) => setProductoSeleccionadoId(e.target.value)}
            disabled={cargando}
            required
          >
            <option value="">
              {cargando ? 'Cargando catálogo...' : '-- Seleccionar ingrediente --'}
            </option>
            {catalogo.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.nombre} ({prod.unidad})
              </option>
            ))}
          </select>
        </div>

        <div className="receta-editor-ingredientes__grupo">
          <label htmlFor="input-cantidad" className="receta-editor-ingredientes__label">
            Cantidad {productoActual ? `(${productoActual.unidad})` : ''}
          </label>
          {/* Criterio 2: Campo numérico con min y required */}
          <input
            id="input-cantidad"
            type="number"
            className="receta-editor-ingredientes__input"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            min="0.1"
            step="any"
            placeholder="Ej. 100"
            required
          />
        </div>

        <button
          type="submit"
          className="receta-editor-ingredientes__btn receta-editor-ingredientes__btn--agregar"
          title="Agregar ingrediente"
        >
          <i className="bi bi-plus-circle-fill" aria-hidden="true"></i>
          <span className="receta-editor-ingredientes__btn-texto">Agregar</span>
        </button>
      </form>

      {ingredientes.length === 0 ? (
        <p className="receta-editor-ingredientes__vacio">
          No hay ingredientes asociados todavía.
        </p>
      ) : (
        <ul className="receta-editor-ingredientes__lista">
          {ingredientes.map((ing) => (
            <li key={ing.productoId} className="receta-editor-ingredientes__item">
              <div className="receta-editor-ingredientes__item-info">
                <strong>{ing.nombre}</strong>
                <span className="receta-editor-ingredientes__badge">
                  {ing.cantidad} {ing.unidad}
                </span>
              </div>

              <button
                type="button"
                className="receta-editor-ingredientes__btn receta-editor-ingredientes__btn--eliminar"
                onClick={() => manejarEliminar(ing.productoId, ing.nombre)}
                title="Quitar ingrediente"
              >
                <i className="bi bi-trash3-fill" aria-hidden="true"></i>
                <span className="receta-editor-ingredientes__btn-texto">Quitar</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}