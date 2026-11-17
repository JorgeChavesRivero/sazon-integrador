import React, { useState } from 'react';
import { procesarCanjeRecompensa } from '../js/catalogoRecompensas';

const RECOMPENSAS_MOCK = [
  { 
    id: 1, 
    nombre: 'Bono Chocolates Jet', 
    descripcion: 'Caja surtida x12 unidades', 
    costo: 500,
    imagen: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 2, 
    nombre: 'Café Matiz Selección', 
    descripcion: 'Bolsa 500g grano o molido', 
    costo: 850,
    imagen: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 3, 
    nombre: 'Galletas Festival', 
    descripcion: 'Paquete familiar multi-sabor', 
    costo: 400,
    imagen: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 4, 
    nombre: 'Bono Restaurante El Corral', 
    descripcion: 'Combo clásico para 1 persona', 
    costo: 1500,
    imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80'
  },
];

export function Catalogo({ puntosIniciales = 1200 }) {
  const [saldoPuntos, setSaldoPuntos] = useState(puntosIniciales);
  const [notificacion, setNotificacion] = useState(null);

  const handleRedimir = (premio) => {
    const resultado = procesarCanjeRecompensa(saldoPuntos, premio);
    if (resultado.autorizado) {
      setSaldoPuntos(resultado.nuevoSaldo);
    }
    setNotificacion({
      tipo: resultado.autorizado ? 'exito' : 'error',
      texto: resultado.mensaje,
    });
  };

  return (
    <section className="max-w-5xl mx-auto p-6 my-6 bg-white rounded-xl shadow-md">
      <header className="flex flex-col sm:flex-row justify-between items-center pb-4 mb-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-emerald-900">Catálogo de Recompensas</h2>
        <p className="mt-2 sm:mt-0 px-4 py-1.5 bg-emerald-100 text-emerald-900 rounded-full font-medium">
          Saldo disponible: <strong className="font-bold">{saldoPuntos} pts</strong>
        </p>
      </header>

      {notificacion && (
        <div
          role="alert"
          className={`p-3 mb-6 rounded-lg font-medium ${
            notificacion.tipo === 'exito'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
              : 'bg-rose-50 text-rose-800 border border-rose-300'
          }`}
        >
          {notificacion.texto}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {RECOMPENSAS_MOCK.map((premio) => {
          const alcanzaSaldo = saldoPuntos >= premio.costo;
          return (
            <article
              key={premio.id}
              className="flex flex-col justify-between p-4 border border-gray-200 rounded-xl bg-gray-50 hover:shadow-md transition overflow-hidden"
            >
              <div>
                <div className="h-32 mb-3 overflow-hidden rounded-lg bg-gray-200">
                  <img 
                    src={premio.imagen} 
                    alt={premio.nombre} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-300" 
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{premio.nombre}</h3>
                <p className="text-sm text-gray-600 mb-4">{premio.descripcion}</p>
              </div>
              <div>
                <span className="block text-sm font-semibold text-emerald-700 mb-3">
                  {premio.costo} puntos
                </span>
                <button
                  type="button"
                  disabled={!alcanzaSaldo}
                  onClick={() => handleRedimir(premio)}
                  className={`w-full py-2 px-3 rounded-lg font-semibold text-sm transition ${
                    alcanzaSaldo
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {alcanzaSaldo ? 'Redimir recompensa' : 'Puntos insuficientes'}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Catalogo;