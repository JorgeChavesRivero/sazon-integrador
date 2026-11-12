const CLAVE_CAMPANAS = 'sazon_mercadeo_campanas';
const PATRON_CODIGO = /^[A-Z0-9_-]{3,20}$/;
const CAMPOS = ['nombre', 'codigo', 'porcentaje', 'inicio', 'fin'];

const cuerpoTabla = document.getElementById('tabla-cuerpo');
const mensajeVacio = document.getElementById('tabla-vacia');
const dialogo = document.getElementById('dialogo-campana');
const formulario = document.getElementById('form-campana');
const sidebar = document.getElementById('sidebar');
const botonAbrirMenu = document.getElementById('abrir-menu');
const botonCerrarMenu = document.getElementById('cerrar-menu');

const entradas = {
  nombre: document.getElementById('campo-nombre'),
  codigo: document.getElementById('campo-codigo'),
  porcentaje: document.getElementById('campo-porcentaje'),
  inicio: document.getElementById('campo-inicio'),
  fin: document.getElementById('campo-fin')
};

const errores = {
  nombre: document.getElementById('error-nombre'),
  codigo: document.getElementById('error-codigo'),
  porcentaje: document.getElementById('error-porcentaje'),
  inicio: document.getElementById('error-inicio'),
  fin: document.getElementById('error-fin')
};

const CLASES_ESTADO = {
  activa: 'bg-sazon-verdeHoja text-white',
  programada: 'bg-amber-100 text-amber-900',
  finalizada: 'bg-stone-200 text-stone-700'
};

function leerCampanas() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_CAMPANAS) || '[]');
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    return [];
  }
}

function guardarCampanas(lista) {
  try {
    localStorage.setItem(CLAVE_CAMPANAS, JSON.stringify(lista));
    return true;
  } catch (error) {
    return false;
  }
}

function existeClave() {
  try {
    return localStorage.getItem(CLAVE_CAMPANAS) !== null;
  } catch (error) {
    return true;
  }
}

function sembrarCampanas() {
  if (existeClave()) return;
  guardarCampanas([
    { id: 'seed-1', nombre: 'Amor y Amistad con sabor', temporada: 'Amor y Amistad', codigo: 'AMIGOS20', porcentaje: 20, inicio: '2026-09-01', fin: '2026-09-21' },
    { id: 'seed-2', nombre: 'Noviembre en la mesa', temporada: 'Todo el año', codigo: 'MESA15', porcentaje: 15, inicio: '2026-11-01', fin: '2026-11-30' },
    { id: 'seed-3', nombre: 'Novenas y Navidad', temporada: 'Navidad', codigo: 'NAVIDAD25', porcentaje: 25, inicio: '2026-12-01', fin: '2026-12-31' }
  ]);
}

function fechaHoy() {
  const ahora = new Date();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const dia = String(ahora.getDate()).padStart(2, '0');
  return `${ahora.getFullYear()}-${mes}-${dia}`;
}

function calcularEstado(campana, hoy) {
  if (hoy < campana.inicio) return 'programada';
  if (hoy > campana.fin) return 'finalizada';
  return 'activa';
}

function formatearFecha(iso) {
  const [anio, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${anio}`;
}

function escapar(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function avisar(mensaje) {
  if (typeof showToast === 'function') showToast(mensaje);
}

function renderizar() {
  const campanas = leerCampanas().slice().sort((a, b) => b.inicio.localeCompare(a.inicio));
  const hoy = fechaHoy();
  const conteo = { activa: 0, programada: 0, finalizada: 0 };

  cuerpoTabla.innerHTML = campanas.map((campana) => {
    const estado = calcularEstado(campana, hoy);
    conteo[estado] += 1;
    const etiqueta = estado.charAt(0).toUpperCase() + estado.slice(1);
    return `<tr data-searchable class="border-b border-sazon-verdeNutresa/10 last:border-0 dark:border-white/10">
      <td class="px-4 py-3"><p class="font-semibold">${escapar(campana.nombre)}</p><p class="text-xs opacity-70">${escapar(campana.temporada)}</p></td>
      <td class="px-4 py-3"><span class="font-mono-tag rounded-md bg-sazon-verdeNutresa/10 px-2 py-1 text-xs dark:bg-white/10">${escapar(campana.codigo)}</span></td>
      <td class="px-4 py-3 font-semibold">${escapar(campana.porcentaje)}%</td>
      <td class="px-4 py-3"><time datetime="${escapar(campana.inicio)}">${formatearFecha(campana.inicio)}</time> al <time datetime="${escapar(campana.fin)}">${formatearFecha(campana.fin)}</time></td>
      <td class="px-4 py-3"><span class="rounded-full px-3 py-1 text-xs font-semibold ${CLASES_ESTADO[estado]}">${etiqueta}</span></td>
      <td class="px-4 py-3 text-right"><button type="button" data-accion="eliminar" data-id="${escapar(campana.id)}" class="rounded-md px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-900/40">Eliminar</button></td>
    </tr>`;
  }).join('');

  mensajeVacio.classList.toggle('hidden', campanas.length > 0);
  document.getElementById('total-activas').textContent = conteo.activa;
  document.getElementById('total-programadas').textContent = conteo.programada;
  document.getElementById('total-finalizadas').textContent = conteo.finalizada;
}

function validarCampo(campo) {
  const valor = entradas[campo].value;

  if (campo === 'nombre') {
    const nombre = valor.trim();
    if (nombre.length < 3) return 'Escribe un nombre de al menos 3 caracteres.';
    return '';
  }

  if (campo === 'codigo') {
    if (!valor) return 'Ingresa el código del cupón.';
    if (/\s/.test(valor)) return 'El código no puede tener espacios.';
    if (valor !== valor.toUpperCase()) return 'El código debe estar en mayúsculas.';
    if (!PATRON_CODIGO.test(valor)) return 'Usa de 3 a 20 caracteres: letras A-Z, números, guion o guion bajo.';
    if (leerCampanas().some((c) => c.codigo === valor)) return 'Ya existe un cupón con ese código.';
    return '';
  }

  if (campo === 'porcentaje') {
    if (valor === '') return 'Ingresa el porcentaje de descuento.';
    const numero = Number(valor);
    if (!Number.isInteger(numero)) return 'El porcentaje debe ser un número entero.';
    if (numero < 1 || numero > 100) return 'El porcentaje debe estar entre 1% y 100%.';
    return '';
  }

  if (campo === 'inicio') {
    if (!valor) return 'Elige la fecha de inicio.';
    return '';
  }

  if (!valor) return 'Elige la fecha de fin.';
  if (entradas.inicio.value && valor <= entradas.inicio.value) return 'La fecha de fin debe ser posterior a la de inicio.';
  return '';
}

function mostrarError(campo, mensaje) {
  const entrada = entradas[campo];
  const salida = errores[campo];
  salida.textContent = mensaje;
  salida.classList.toggle('hidden', mensaje === '');
  if (mensaje) {
    entrada.setAttribute('aria-invalid', 'true');
    entrada.classList.add('campo-invalido');
  } else {
    entrada.removeAttribute('aria-invalid');
    entrada.classList.remove('campo-invalido');
  }
}

function revalidar(campo) {
  mostrarError(campo, validarCampo(campo));
}

function validarFormulario() {
  let primerInvalido = null;
  CAMPOS.forEach((campo) => {
    const mensaje = validarCampo(campo);
    mostrarError(campo, mensaje);
    if (mensaje && !primerInvalido) primerInvalido = campo;
  });
  if (primerInvalido) entradas[primerInvalido].focus();
  return primerInvalido === null;
}

function limpiarFormulario() {
  formulario.reset();
  CAMPOS.forEach((campo) => mostrarError(campo, ''));
  entradas.fin.removeAttribute('min');
}

function abrirDialogo() {
  limpiarFormulario();
  dialogo.showModal();
  entradas.nombre.focus();
}

function cerrarDialogo() {
  dialogo.close();
}

function normalizarCodigo() {
  const limpio = entradas.codigo.value.toUpperCase().replace(/\s+/g, '');
  if (limpio !== entradas.codigo.value) entradas.codigo.value = limpio;
}

function generarId() {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
  return `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function crearCampana(evento) {
  evento.preventDefault();
  if (!validarFormulario()) return;

  const campana = {
    id: generarId(),
    nombre: entradas.nombre.value.trim(),
    temporada: document.getElementById('campo-temporada').value,
    codigo: entradas.codigo.value,
    porcentaje: Number(entradas.porcentaje.value),
    inicio: entradas.inicio.value,
    fin: entradas.fin.value
  };

  const lista = leerCampanas();
  lista.push(campana);

  if (!guardarCampanas(lista)) {
    avisar('No se pudo guardar. Revisa que tu navegador permita almacenamiento local.');
    return;
  }

  renderizar();
  cerrarDialogo();
  avisar(`Campaña creada con el cupón ${campana.codigo}`);
}

function eliminarCampana(id) {
  const lista = leerCampanas();
  const campana = lista.find((c) => c.id === id);
  if (!campana) return;
  if (!window.confirm(`¿Eliminar la campaña "${campana.nombre}" y su cupón ${campana.codigo}?`)) return;
  guardarCampanas(lista.filter((c) => c.id !== id));
  renderizar();
  avisar('Campaña eliminada');
}

function abrirMenu() {
  sidebar.classList.remove('-translate-x-full');
  botonAbrirMenu.setAttribute('aria-expanded', 'true');
}

function cerrarMenu() {
  sidebar.classList.add('-translate-x-full');
  botonAbrirMenu.setAttribute('aria-expanded', 'false');
}

function alternarTema() {
  if (typeof switchTheme !== 'function') return;
  const esOscuro = document.documentElement.classList.contains('dark');
  switchTheme(esOscuro ? 'light' : 'dark');
}

CAMPOS.forEach((campo) => {
  entradas[campo].addEventListener('blur', () => revalidar(campo));
  entradas[campo].addEventListener('input', () => {
    if (campo === 'codigo') normalizarCodigo();
    if (campo === 'inicio') {
      entradas.fin.min = entradas.inicio.value;
      if (entradas.fin.value || entradas.fin.hasAttribute('aria-invalid')) revalidar('fin');
    }
    if (entradas[campo].hasAttribute('aria-invalid')) revalidar(campo);
  });
});

formulario.addEventListener('submit', crearCampana);
document.getElementById('nueva-campana').addEventListener('click', abrirDialogo);
document.getElementById('cancelar-campana').addEventListener('click', cerrarDialogo);
document.getElementById('cambiar-tema').addEventListener('click', alternarTema);
botonAbrirMenu.addEventListener('click', abrirMenu);
botonCerrarMenu.addEventListener('click', cerrarMenu);

cuerpoTabla.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-accion="eliminar"]');
  if (boton) eliminarCampana(boton.dataset.id);
});

document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') cerrarMenu();
});

document.querySelector('main').addEventListener('click', () => {
  if (window.matchMedia('(max-width: 1023px)').matches) cerrarMenu();
});

sembrarCampanas();
renderizar();
