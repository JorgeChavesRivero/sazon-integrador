import React, { useState } from 'react';
import { procesarCanjeRecompensa } from '../js/catalogoRecompensas';

const RECOMPENSAS_MOCK = [
    { id: 1, nombre: 'Bono Chocolates Jet', descripcion: 'Caja surtida x12 unidades', costo: 500 },
    { id: 2, nombre: 'Café Matiz Selección', descripcion: 'Bolsa 500g grano o molido', costo: 850 },
    { id: 3, nombre: 'Galletas Festival', descripcion: 'Paquete familiar multi-sabor', costo: 400 },
    { id: 4, nombre: 'Bono Restaurante El Corral', descripcion: 'Combo clásico para 1 persona', costo: 1500 },
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
        <section className="catalogo-recompensas">
            <header className="catalogo-header">
                <h2>Catálogo de Recompensas</h2>
                <p>
                    Saldo disponible: <strong>{saldoPuntos} pts</strong>
                </p>
            </header>

            {notificacion && (
                <div role="alert" className={`alerta-${notificacion.tipo}`}>
                    {notificacion.texto}
                </div>
            )}

            <div className="catalogo-grid">
                {RECOMPENSAS_MOCK.map((premio) => {
                    const alcanzaSaldo = saldoPuntos >= premio.costo;
                    return (
                        <article key={premio.id} className="recompensa-card">
                            <h3>{premio.nombre}</h3>
                            <p>{premio.descripcion}</p>
                            <span className="recompensa-costo">{premio.costo} puntos</span>
                            <button
                                type="button"
                                disabled={!alcanzaSaldo}
                                onClick={() => handleRedimir(premio)}
                            >
                                {alcanzaSaldo ? 'Redimir recompensa' : 'Puntos insuficientes'}
                            </button>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default Catalogo;