import React, { useState } from 'react';

const RECOMPENSAS_MOCK = [
    { id: 1, nombre: 'Bono Chocolates Jet', descripcion: 'Caja surtida x12 unidades', costo: 500 },
    { id: 2, nombre: 'Café Matiz Selección', descripcion: 'Bolsa 500g grano o molido', costo: 850 },
    { id: 3, nombre: 'Galletas Festival', descripcion: 'Paquete familiar multi-sabor', costo: 400 },
    { id: 4, nombre: 'Bono Restaurante El Corral', descripcion: 'Combo clásico para 1 persona', costo: 1500 },
];

export function Catalogo({ puntosUsuario = 1200, onCanjear }) {
    return (
        <section className="catalogo-recompensas">
            <header className="catalogo-header">
                <h2>Catálogo de Recompensas</h2>
                <p>
                    Saldo disponible: <strong>{puntosUsuario} pts</strong>
                </p>
            </header>

            <div className="catalogo-grid">
                {RECOMPENSAS_MOCK.map((premio) => (
                    <article key={premio.id} className="recompensa-card">
                        <h3>{premio.nombre}</h3>
                        <p>{premio.descripcion}</p>
                        <span className="recompensa-costo">{premio.costo} puntos</span>
                        <button
                            type="button"
                            onClick={() => onCanjear && onCanjear(premio)}
                        >
                            Redimir recompensa
                        </button>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Catalogo;