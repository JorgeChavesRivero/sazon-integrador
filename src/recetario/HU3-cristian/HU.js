import { useState, useEffect } from 'react';
import { recetasSemilla } from './recetas';

const CLAVE_STORAGE = 'sazon_recetas_semilla_v3';

export default function App() {
  const [recetas, setRecetas] = useState([]);
  const [filtro, setFiltro] = useState('todas');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    try {
      const guardadas = JSON.parse(localStorage.getItem(CLAVE_STORAGE) || 'null');
      if (Array.isArray(guardadas) && guardadas.length > 0) {
        setRecetas(guardadas);
      } else {
        setRecetas(recetasSemilla);
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(recetasSemilla));
      }
    } catch {
      setRecetas(recetasSemilla);
    }
  }, []);

  const recetasFiltradas = recetas.filter((r) => {
    const coincideFiltro = filtro === 'todas' || r.estado === filtro;
    const coincideBusqueda =
      r.nombreReceta.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
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
          <span className="text-xs font-mono-tag hidden sm:inline text-[#E9E8D7]">feature/recetario/G2-EDT-F03-semilla</span>
          <span className="w-8 h-8 rounded-full bg-[#7FBA00] text-[#114622] font-bold flex items-center justify-center text-sm shadow">CC</span>
        </aside>
      </header>

      <section className="max-w-5xl w-full mx-auto px-4 py-6 flex-grow space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#E9E8D7] p-4 rounded-xl border border-[#3D8E33]/30 shadow-sm gap-4">
          <p className="text-xs font-mono-tag text-[#114622] font-semibold">
            Sa·zón / Editor de Recetas / Datos Semilla (HU 2.3.3)
          </p>
          <span className="text-xs font-mono-tag bg-[#215B33] text-[#F4F4E8] px-3 py-1 rounded-full shadow">
            IDs Consecutivos 1 al 5 + Pruebas
          </span>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <article className="bg-[#E9E8D7] p-4 rounded-xl border border-[#3D8E33]/20 flex justify-between items-center shadow-sm">
            <section>
              <p className="text-xs font-mono-tag text-gray-600 uppercase">Total Semilla</p>
              <h3 className="text-2xl font-poppins font-bold text-[#114622] mt-1">{recetas.length}</h3>
              <p className="text-xs text-[#3D8E33] mt-0.5">IDs 1 al {recetas.length} verificados</p>
            </section>
            <span className="p-3 bg-white rounded-lg text-[#3D8E33] shadow-inner font-mono-tag font-bold">SEEDS</span>
          </article>

          <article className="bg-[#E9E8D7] p-4 rounded-xl border border-[#3D8E33]/20 flex justify-between items-center shadow-sm">
            <section>
              <p className="text-xs font-mono-tag text-gray-600 uppercase">Borrador</p>
              <h3 className="text-2xl font-poppins font-bold text-[#D6121A] mt-1">{totalBorradores}</h3>
              <p className="text-xs text-[#2A1605] mt-0.5">● Pendientes</p>
            </section>
            <span className="p-3 bg-white rounded-lg text-[#D6121A] shadow-inner font-mono-tag font-bold">DRF</span>
          </article>

          <article className="bg-[#E9E8D7] p-4 rounded-xl border border-[#3D8E33]/20 flex justify-between items-center shadow-sm">
            <section>
              <p className="text-xs font-mono-tag text-gray-600 uppercase">Publicadas</p>
              <h3 className="text-2xl font-poppins font-bold text-[#215B33] mt-1">{totalPublicadas}</h3>
              <p className="text-xs text-[#3D8E33] mt-0.5">✓ Homologadas</p>
            </section>
            <span className="p-3 bg-white rounded-lg text-[#215B33] shadow-inner font-mono-tag font-bold">PUB</span>
          </article>
        </section>

        <section className="bg-[#E9E8D7] p-3 rounded-xl flex flex-col md:flex-row justify-between items-center gap-3 shadow-sm">
          <section className="w-full md:w-96">
            <label htmlFor="buscador-semilla" className="sr-only">Buscar receta semilla</label>
            <input
              id="buscador-semilla"
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
            <h2 className="font-poppins font-bold text-sm tracking-wide text-[#114622] uppercase">Registros Semilla Cargados</h2>
            <span className="text-xs font-mono-tag text-gray-600">Mostrando {recetasFiltradas.length} de {recetas.length}</span>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recetasFiltradas.map((receta) => (
              <article key={receta.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col justify-between">
                <section className="p-4 space-y-3">
                  <header className="flex justify-between items-center">
                    <span className={`text-[10px] font-mono-tag font-bold px-2.5 py-1 rounded-full text-white uppercase ${receta.estado === 'publicada' ? 'bg-[#3D8E33]' : 'bg-[#D6121A]'}`}>
                      {receta.estado}
                    </span>
                    <span className="font-mono-tag text-xs font-bold text-gray-500">ID: {receta.id} ({receta.codigo})</span>
                  </header>

                  <section className="space-y-1">
                    <p className="text-[10px] font-mono-tag text-[#3D8E33] font-bold tracking-wider">{receta.marca}</p>
                    <h3 className="font-poppins font-bold text-lg text-[#114622] leading-snug">{receta.nombreReceta}</h3>
                    <p className="text-xs text-gray-600">{receta.descripcion}</p>
                    <p className="text-[11px] text-gray-400 font-mono-tag">FK Categoria: {receta.categoriaId} | Por {receta.autor}</p>
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
          <span className="font-bold text-[#7FBA00] underline">Recetas (Semilla)</span>
          <span className="opacity-75">Proveedores</span>
          <span className="opacity-75">Mermas</span>
        </nav>
      </footer>
    </main>
  );
}