import { useState } from "react";

const catalogoInicial = [
  { id: 1, nombre: "Chocolatina Jet 50g", costo: 150, categoria: "Dulces", emoji: "🍫" },
  { id: 2, nombre: "Café Sello Rojo 250g", costo: 350, categoria: "Café", emoji: "☕" },
  { id: 3, nombre: "Galletas Tosh x6", costo: 280, categoria: "Snacks", emoji: "🍪" },
  { id: 4, nombre: "Bono $20.000", costo: 800, categoria: "Bonos", emoji: "🎁" },
  { id: 5, nombre: "Leche Colanta x6", costo: 500, categoria: "Lácteos", emoji: "🥛" },
  { id: 6, nombre: "Pasta Doria 500g", costo: 220, categoria: "Despensa", emoji: "🍝" },
];

export default function PuntosRecompensas() {
  const [saldo, setSaldo] = useState(620);
  const [mensaje, setMensaje] = useState("");

  const handleRedimir = (premio) => {
    if (saldo < premio.costo) {
      setMensaje(`No tienes suficientes puntos. Te faltan ${premio.costo - saldo} pts.`);
      return;
    }
    setSaldo(saldo - premio.costo);
    setMensaje(`¡Redimido! ${premio.nombre} por ${premio.costo} pts.`);
  };

  return (
    <div className="min-h-screen bg-nutre-900 p-4">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-3xl font-black">Mis Puntos <span className="text-nutre-400">Nutresa</span></h1>
        <div className="bg-nutre-500 rounded-[20px] p-5 mt-4 text-nutre-900">
          <p className="text-xs font-bold">SALDO ACTUAL</p>
          <p className="text-4xl font-black">{saldo} pts</p>
        </div>

        {mensaje && <div className="mt-4 p-3 rounded-xl bg-white text-nutre-900 font-bold text-center">{mensaje}</div>}

        <h2 className="text-xl font-black mt-6">Catálogo de Premios</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {catalogoInicial.map(p => (
            <div key={p.id} className="glass rounded-[20px] p-5">
              <p className="text-5xl text-center">{p.emoji}</p>
              <h3 className="font-bold text-center mt-2">{p.nombre}</h3>
              <p className="text-nutre-400 font-black text-center text-xl">{p.costo} pts</p>
              <button
                onClick={() => handleRedimir(p)}
                disabled={saldo < p.costo}
                className={`w-full mt-3 py-3 rounded-xl font-black ${saldo >= p.costo ? "bg-nutre-500 text-nutre-900" : "bg-white/10 text-white/40"}`}
              >
                {saldo >= p.costo ? "REDIMIR →" : `Te faltan ${p.costo - saldo} pts`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}