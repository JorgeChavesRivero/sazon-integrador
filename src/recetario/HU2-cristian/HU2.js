import { useState, useEffect } from 'react';

const CLAVE_STORAGE = 'sazon_recetas_lista';
const ESTADOS_PERMITIDOS = ['borrador', 'publicada'];

const RECETAS_INICIALES = [
  { id: '#501', nombreReceta: 'Tiramisú Criollo de Corona', marca: 'CHOCOLATE CORONA', tiempoPreparacion: 30, porciones: 6, dificultad: 'Baja', estado: 'publicada', autor: 'C. Cruz · Repostería' },
  { id: '#502', nombreReceta: 'Tornillos Doria Carbonara', marca: 'PASTAS DORIA', tiempoPreparacion: 25, porciones: 4, dificultad: 'Media', estado: 'publicada', autor: 'C. Cruz · Pastas' },
  { id: '#503', nombreReceta: 'Lomo Zenú Glaseado Colcafé', marca: 'ZENÚ & COLCAFÉ', tiempoPreparacion: 75, porciones: 8, dificultad: 'Alta', estado: 'borrador', autor: 'C. Cruz · Carnes' },
  { id: '#504', nombreReceta: 'Cheesecake Costra Saltín', marca: 'NOEL TRADICIONAL', tiempoPreparacion: 45, porciones: 10, dificultad: 'Baja', estado: 'publicada', autor: 'C. Cruz · Postres' }
];

const recetaServicio = {
  validarEstado: (estado) => {
    if (typeof estado !== 'string' || !ESTADOS_PERMITIDOS.includes(estado.toLowerCase())) {
      return { valido: false, error: 'El estado seleccionado no corresponde a las reglas del backend (borrador | publicada).' };
    }
    return { valido: true, error: null };
  },
  guardarEnSesion: (lista) => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista));
      return true;
    } catch {
      return false;
    }
  }
};

export default function App() {
  const [recetas, setRecetas] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [filtro, setFiltro] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [alerta, setAlerta] = useState({ visible: false, mensaje: '', tipo: 'exito' });

  const [formData, setFormData] = useState({
    nombreReceta: '',
    marca: 'CHOCOLATE CORONA',
    descripcion: '',
    tiempoPreparacion: 30,
    porciones: 4,
    dificultad: 'Baja',
    estado: 'borrador'
  });

  useEffect(() => {
    try {
      const almacenadas = JSON.parse(localStorage.getItem(CLAVE_STORAGE) || 'null');
      if (Array.isArray(almacenadas) && almacenadas.length > 0) {
        setRecetas(almacenadas);
      } else {
        setRecetas(RECETAS_INICIALES);
        recetaServicio.guardarEnSesion(RECETAS_INICIALES);
      }
    } catch {
      setRecetas(RECETAS_INICIALES);
    }
  }, []);

  const dispararAlerta = (mensaje, tipo = 'exito') => {
    setAlerta({ visible: true, mensaje, tipo });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardarReceta = (e) => {
    e.preventDefault();

    const validacion = recetaServicio.validarEstado(formData.estado);
    if (!validacion.valido) {
      dispararAlerta(validacion.error, 'error');
      return;
    }

    if (!formData.nombreReceta.trim() || !formData.descripcion.trim()) {
      dispararAlerta('Complete el nombre y la descripción antes de continuar.', 'error');
      return;
    }

    const nuevaReceta = {
      id: `#${Math.floor(505 + Math.random() * 490)}`,
      nombreReceta: formData.nombreReceta.trim(),
      marca: formData.marca,
      descripcion: formData.descripcion.trim(),
      tiempoPreparacion: Number(formData.tiempoPreparacion),
      porciones: Number(formData.porciones),
      dificultad: formData.dificultad,
      estado: formData.estado.toLowerCase(),
      autor: 'C. Cruz · Célula 2'
    };

    const actualizadas = [nuevaReceta, ...recetas];
    if (recetaServicio.guardarEnSesion(actualizadas)) {
      setRecetas(actualizadas);
      setModalAbierto(false);
      dispararAlerta(`Receta "${nuevaReceta.nombreReceta}" guardada exitosamente en estado ${nuevaReceta.estado.toUpperCase()}.`, 'exito');
      setFormData({
        nombreReceta: '',
        marca: 'CHOCOLATE CORONA',
        descripcion: '',
        tiempoPreparacion: 30,
        porciones: 4,
        dificultad: 'Baja',
        estado: 'borrador'
      });
    } else {
      dispararAlerta('No fue posible actualizar el almacenamiento local de la sesión.', 'error');
    }
  };

  const handleCambiarEstadoDirecto = (id, nuevoEstado) => {
    const validacion = recetaServicio.validarEstado(nuevoEstado);
    if (!validacion.valido) {
      dispararAlerta(validacion.error, 'error');
      return;
    }

    const actualizadas = recetas.map((receta) =>
      receta.id === id ? { ...receta, estado: nuevoEstado } : receta
    );

    if (recetaServicio.guardarEnSesion(actualizadas)) {
      setRecetas(actualizadas);
      const recetaEditada = actualizadas.find((r) => r.id === id);
      dispararAlerta(`Estado de "${recetaEditada.nombreReceta}" actualizado a ${nuevoEstado.toUpperCase()}.`, 'exito');
    }
  };

  const recetasFiltradas = recetas.filter((r) => {
    const coincideFiltro = filtro === 'todas' || r.estado === filtro;
    const coincideBusqueda =
      r.nombreReceta.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.marca.toLowerCase().includes(busqueda.toLowerCase());
    return coincideFiltro && coincideBusqueda;
  });

  const totalBorradores = recetas.filter((r) => r.estado === 'borrador').length;
  const totalPublicadas = recetas.filter((r) => r.estado === 'publicada').length;

  return (
    <main className="min-h-screen bg-[#F4F4E8] text-[#3F4040] font-inter flex flex-col justify-between">
      <header className="bg-[#114622] text-[#F4F4E8] px-6 py-3 flex items-center justify-between shadow-md">
        <section className="flex items-center space-x-3">
          <span className="p-1.5 bg-[#7FBA00] rounded text-[#114622] font-bold text-sm">SZ</span>
          <section>
            <h1 className="font-poppins font-bold text-base tracking-wide text-white">Editor de Recetas</h1>
            <p className="text-xs text-[#7FBA00] tracking-wider uppercase">División Gastronomía Nutresa</p>
          </section>
        </section>
        <aside className="flex items-center space-x-3">
          <span className="text-xs font-mono-tag hidden sm:inline text-[#E9E8D7]">feature/recetario/G2-EDT-F02-estados</span>
          <span className="w-8 h-8 rounded-full bg-[#7FBA00] text-[#114622] font-bold flex items-center justify-center text-sm shadow">CC</span>
        </aside>
      </header>

      <section className="max-w-5xl w-full mx-auto px-4 py-6 flex-grow space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#E9E8D7] p-4 rounded-xl border border-[#3D8E33]/30 shadow-sm gap-4">
          <p className="text-xs font-mono-tag text-[#114622] font-semibold">
            Sa·zón / Editor de Recetas / Gestión de Estados
          </p>
          <span className="text-xs font-mono-tag bg-[#215B33] text-[#F4F4E8] px-3 py-1 rounded-full shadow">
            HU 2.3.2 · Borrador vs Publicada
          </span>
        </header>

        {alerta.visible && (
          <output
            role="alert"
            aria-live="assertive"
            className={`flex items-center justify-between p-4 rounded-xl text-sm font-medium shadow-md border ${
              alerta.tipo === 'error'
                ? 'bg-[#D6121A] text-white border-red-900'
                : 'bg-[#215B33] text-[#F4F4E8] border-[#7FBA00]'
            }`}
          >
            <span>{alerta.mensaje}</span>
            <button
              type="button"
              onClick={() => setAlerta({ ...alerta, visible: false })}
              className="ml-4 font-mono-tag text-xs underline opacity-90 hover:opacity-100"
            >
              Cerrar
            </button>
          </output>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <article className="bg-[#E9E8D7] p-4 rounded-xl border border-[#3D8E33]/20 flex justify-between items-center shadow-sm">
            <section>
              <p className="text-xs font-mono-tag text-gray-600 uppercase">Total</p>
              <h3 className="text-2xl font-poppins font-bold text-[#114622] mt-1">{recetas.length}</h3>
              <p className="text-xs text-[#3D8E33] mt-0.5">↑ Activas en sesión</p>
            </section>
            <span className="p-3 bg-white rounded-lg text-[#3D8E33] shadow-inner font-mono-tag font-bold">ALL</span>
          </article>

          <article className="bg-[#E9E8D7] p-4 rounded-xl border border-[#3D8E33]/20 flex justify-between items-center shadow-sm">
            <section>
              <p className="text-xs font-mono-tag text-gray-600 uppercase">Borrador</p>
              <h3 className="text-2xl font-poppins font-bold text-[#D6121A] mt-1">{totalBorradores}</h3>
              <p className="text-xs text-[#2A1605] mt-0.5">● Pendientes de revisión</p>
            </section>
            <span className="p-3 bg-white rounded-lg text-[#D6121A] shadow-inner font-mono-tag font-bold">DRF</span>
          </article>

          <article className="bg-[#E9E8D7] p-4 rounded-xl border border-[#3D8E33]/20 flex justify-between items-center shadow-sm">
            <section>
              <p className="text-xs font-mono-tag text-gray-600 uppercase">Publicadas</p>
              <h3 className="text-2xl font-poppins font-bold text-[#215B33] mt-1">{totalPublicadas}</h3>
              <p className="text-xs text-[#3D8E33] mt-0.5">✓ Visibles en catálogo</p>
            </section>
            <span className="p-3 bg-white rounded-lg text-[#215B33] shadow-inner font-mono-tag font-bold">PUB</span>
          </article>
        </section>

        <section className="bg-[#E9E8D7] p-3 rounded-xl flex flex-col md:flex-row justify-between items-center gap-3 shadow-sm">
          <section className="w-full md:w-96">
            <label htmlFor="buscador-recetas" className="sr-only">Buscar receta</label>
            <input
              id="buscador-recetas"
              type="text"
              placeholder="Buscar por ID, nombre o marca..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full px-4 py-2 bg-white rounded-lg text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3D8E33]"
            />
          </section>

          <nav className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto">
            <button type="button" onClick={() => setFiltro('todas')} className={`px-4 py-1.5 rounded-lg text-xs font-mono-tag font-bold shadow-sm ${filtro === 'todas' ? 'bg-[#215B33] text-white' : 'bg-white text-gray-700'}`}>
              Todas {recetas.length}
            </button>
            <button type="button" onClick={() => setFiltro('publicada')} className={`px-4 py-1.5 rounded-lg text-xs font-mono-tag font-bold shadow-sm ${filtro === 'publicada' ? 'bg-[#215B33] text-white' : 'bg-white text-gray-700'}`}>
              Publicadas {totalPublicadas}
            </button>
            <button type="button" onClick={() => setFiltro('borrador')} className={`px-4 py-1.5 rounded-lg text-xs font-mono-tag font-bold shadow-sm ${filtro === 'borrador' ? 'bg-[#215B33] text-white' : 'bg-white text-gray-700'}`}>
              Borradores {totalBorradores}
            </button>
          </nav>
        </section>

        <section className="space-y-4">
          <header className="flex justify-between items-center">
            <h2 className="font-poppins font-bold text-sm tracking-wide text-[#114622] uppercase">Recetas Registradas</h2>
            <span className="text-xs font-mono-tag text-gray-600">Mostrando {recetasFiltradas.length} de {recetas.length}</span>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recetasFiltradas.map((receta) => (
              <article key={receta.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col justify-between">
                <section className="p-4 space-y-3">
                  <header className="flex justify-between items-center gap-2">
                    <span className={`text-[10px] font-mono-tag font-bold px-2.5 py-1 rounded-full text-white uppercase ${receta.estado === 'publicada' ? 'bg-[#3D8E33]' : 'bg-[#D6121A]'}`}>
                      {receta.estado}
                    </span>

                    <section className="flex items-center space-x-2">
                      <label htmlFor={`estado-${receta.id}`} className="sr-only">Cambiar estado de {receta.nombreReceta}</label>
                      <select
                        id={`estado-${receta.id}`}
                        value={receta.estado}
                        onChange={(e) => handleCambiarEstadoDirecto(receta.id, e.target.value)}
                        className="text-xs font-mono-tag bg-[#F4F4E8] border border-[#3D8E33] text-[#114622] rounded px-2 py-1 font-semibold focus:outline-none focus:ring-1 focus:ring-[#3D8E33]"
                      >
                        <option value="borrador">Borrador</option>
                        <option value="publicada">Publicada</option>
                      </select>
                      <span className="font-mono-tag text-xs font-bold text-gray-500">{receta.id}</span>
                    </section>
                  </header>

                  <section className="space-y-1">
                    <p className="text-[10px] font-mono-tag text-[#3D8E33] font-bold tracking-wider">{receta.marca}</p>
                    <h3 className="font-poppins font-bold text-lg text-[#114622] leading-snug">{receta.nombreReceta}</h3>
                    <p className="text-xs text-gray-500">Por {receta.autor}</p>
                  </section>
                </section>

                <footer className="bg-[#F4F4E8] px-4 py-3 border-t border-gray-200 grid grid-cols-3 text-center text-xs font-mono-tag">
                  <span>TIEMPO<br /><strong className="text-[#114622]">{receta.tiempoPreparacion}m</strong></span>
                  <span>PORC<br /><strong className="text-[#114622]">{receta.porciones} p</strong></span>
                  <span>DIF<br /><strong className="text-[#114622]">{receta.dificultad}</strong></span>
                </footer>
              </article>
            ))}
          </section>
        </section>
      </section>

      <footer className="bg-[#215B33] text-[#F4F4E8] py-4 border-t border-[#3D8E33] mt-8">
        <nav className="max-w-md mx-auto flex justify-around items-center text-xs font-mono-tag">
          <span className="opacity-75">Stock</span>
          <span className="opacity-75">Fichas</span>
          <span className="font-bold text-[#7FBA00] underline">Recetas</span>
          <span className="opacity-75">Proveedores</span>
          <span className="opacity-75">Mermas</span>
        </nav>
      </footer>

      <button
        type="button"
        onClick={() => setModalAbierto(true)}
        className="receta-btn-nuevo fixed bottom-16 right-6 px-5 py-3 rounded-full font-poppins font-bold text-sm shadow-2xl flex items-center space-x-2 z-40 border-2 border-white"
      >
        <span className="text-lg">+</span>
        <span>NUEVA RECETA</span>
      </button>

      {modalAbierto && (
        <section className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <article className="bg-[#F4F4E8] w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-[#3D8E33]">
            <header className="bg-[#114622] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="font-poppins font-bold text-lg">Editor de Recetas · Estado de Publicación</h3>
              <button type="button" onClick={() => setModalAbierto(false)} className="text-white hover:text-gray-300 font-bold text-xl">✕</button>
            </header>

            <form onSubmit={handleGuardarReceta} className="p-6 space-y-4 max-h-[82vh] overflow-y-auto">
              <fieldset className="space-y-4 border-0 p-0 m-0">
                <legend className="text-xs font-mono-tag font-bold text-[#215B33] uppercase">Datos Generales de la Receta</legend>

                <p className="flex flex-col space-y-1">
                  <label htmlFor="nombreReceta" className="text-xs font-mono-tag font-bold text-[#114622]">NOMBRE DE LA RECETA</label>
                  <input
                    type="text"
                    id="nombreReceta"
                    name="nombreReceta"
                    value={formData.nombreReceta}
                    onChange={handleChange}
                    required
                    placeholder="Ej. Arroz con Pollo Zenú"
                    className="p-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-[#3D8E33]"
                  />
                </p>

                <p className="flex flex-col space-y-1">
                  <label htmlFor="marca" className="text-xs font-mono-tag font-bold text-[#114622]">MARCA OFICIAL NUTRESA</label>
                  <select
                    id="marca"
                    name="marca"
                    value={formData.marca}
                    onChange={handleChange}
                    required
                    className="p-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-[#3D8E33]"
                  >
                    <option value="CHOCOLATE CORONA">Chocolate Corona</option>
                    <option value="PASTAS DORIA">Pastas Doria</option>
                    <option value="ZENÚ">Zenú</option>
                    <option value="NOEL TRADICIONAL">Galletas Noel</option>
                    <option value="PIETRÁN">Pietrán</option>
                  </select>
                </p>

                <p className="flex flex-col space-y-1">
                  <label htmlFor="descripcion" className="text-xs font-mono-tag font-bold text-[#114622]">DESCRIPCIÓN</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    rows="2"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                    placeholder="Breve resumen de preparación..."
                    className="p-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-[#3D8E33]"
                  ></textarea>
                </p>

                <section className="grid grid-cols-3 gap-3">
                  <p className="flex flex-col space-y-1">
                    <label htmlFor="tiempoPreparacion" className="text-xs font-mono-tag font-bold text-[#114622]">TIEMPO (MIN)</label>
                    <input
                      type="number"
                      id="tiempoPreparacion"
                      name="tiempoPreparacion"
                      min="1"
                      max="300"
                      value={formData.tiempoPreparacion}
                      onChange={handleChange}
                      required
                      className="p-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-[#3D8E33]"
                    />
                  </p>

                  <p className="flex flex-col space-y-1">
                    <label htmlFor="porciones" className="text-xs font-mono-tag font-bold text-[#114622]">PORCIONES</label>
                    <input
                      type="number"
                      id="porciones"
                      name="porciones"
                      min="1"
                      max="50"
                      value={formData.porciones}
                      onChange={handleChange}
                      required
                      className="p-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-[#3D8E33]"
                    />
                  </p>

                  <p className="flex flex-col space-y-1">
                    <label htmlFor="dificultad" className="text-xs font-mono-tag font-bold text-[#114622]">DIFICULTAD</label>
                    <select
                      id="dificultad"
                      name="dificultad"
                      value={formData.dificultad}
                      onChange={handleChange}
                      className="p-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-[#3D8E33]"
                    >
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                    </select>
                  </p>
                </section>
              </fieldset>

              <fieldset className="p-4 rounded-xl bg-[#E9E8D7] border border-[#3D8E33] space-y-3">
                <legend className="px-2 text-xs font-mono-tag font-bold text-[#114622] uppercase">
                  Estado de Publicación (HU 2.3.2)
                </legend>

                <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    htmlFor="radio-borrador"
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer ${
                      formData.estado === 'borrador'
                        ? 'bg-[#215B33] text-white border-[#114622]'
                        : 'bg-white text-[#3F4040] border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      id="radio-borrador"
                      name="estado"
                      value="borrador"
                      checked={formData.estado === 'borrador'}
                      onChange={handleChange}
                      className="accent-[#7FBA00]"
                    />
                    <span className="text-xs font-mono-tag font-bold uppercase">Borrador (Privado)</span>
                  </label>

                  <label
                    htmlFor="radio-publicada"
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer ${
                      formData.estado === 'publicada'
                        ? 'bg-[#3D8E33] text-white border-[#114622]'
                        : 'bg-white text-[#3F4040] border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      id="radio-publicada"
                      name="estado"
                      value="publicada"
                      checked={formData.estado === 'publicada'}
                      onChange={handleChange}
                      className="accent-[#7FBA00]"
                    />
                    <span className="text-xs font-mono-tag font-bold uppercase">Publicada (Catálogo)</span>
                  </label>
                </section>
              </fieldset>

              <footer className="pt-4 border-t border-gray-300 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="px-4 py-2 rounded-lg text-sm font-mono-tag bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-sm font-poppins font-bold bg-[#3D8E33] text-white shadow hover:bg-[#215B33]"
                >
                  Guardar como {formData.estado === 'publicada' ? 'Publicada' : 'Borrador'}
                </button>
              </footer>
            </form>
          </article>
        </section>
      )}
    </main>
  );
}