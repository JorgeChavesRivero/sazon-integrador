export function procesarCanjeRecompensa(saldoActual, recompensa) {
    if (!recompensa || typeof recompensa.costo !== 'number') {
        return {
            autorizado: false,
            nuevoSaldo: saldoActual,
            mensaje: 'Recompensa no válida.',
        };
    }

    if (saldoActual < recompensa.costo) {
        return {
            autorizado: false,
            nuevoSaldo: saldoActual,
            mensaje: `Puntos insuficientes. Te faltan ${recompensa.costo - saldoActual} pts para "${recompensa.nombre}".`,
        };
    }

    const nuevoSaldo = saldoActual - recompensa.costo;
    return {
        autorizado: true,
        nuevoSaldo,
        mensaje: `¡Canje exitoso! Has redimido "${recompensa.nombre}". Saldo restante: ${nuevoSaldo} pts.`,
    };
}