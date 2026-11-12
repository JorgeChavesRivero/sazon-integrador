import { useEffect, useState } from "react";

const STORAGE_KEY_CUPONES = "sazon_cupones";
const STORAGE_KEY_REDIMIDOS = "sazon_cupones_redimidos";

function obtenerFechaLocalISO(offsetDias = 0) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + offsetDias);
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

export function construirCuponesIniciales() {
  return [
    {
      id: "cup-1",
      codigo: "NUTRESA20",
      marca: "Zenú y Doria",
      titulo: "20% de descuento en combos familiares",
      beneficio: "20% de descuento en línea seleccionada Zenú y Pasta Doria",
      categoria: "Descuentos",
      descuento: "20% DCTO",
      fechaInicio: obtenerFechaLocalISO(-15),
      fechaFin: obtenerFechaLocalISO(45),
      activo: true,
      usosActuales: 12,
      usosMaximos: 500,
    },
    {
      id: "cup-2",
      codigo: "PIETRAN15",
      marca: "Pietrán",
      titulo: "Semana de bienestar y proteína balanceada",
      beneficio: "15% de descuento en jamones y pechugas Pietrán",
      categoria: "Descuentos",
      descuento: "15% DCTO",
      fechaInicio: obtenerFechaLocalISO(-10),
      fechaFin: obtenerFechaLocalISO(30),
      activo: true,
      usosActuales: 8,
      usosMaximos: 300,
    },
    {
      id: "cup-3",
      codigo: "CHOCOJET2X1",
      marca: "Jet y Noel",
      titulo: "Merienda en familia: lleva 2 y paga 1",
      beneficio: "2x1 en Chocolatina Jet 50g y Galletas Noel seleccionadas",
      categoria: "Combos",
      descuento: "2x1",
      fechaInicio: obtenerFechaLocalISO(-5),
      fechaFin: obtenerFechaLocalISO(20),
      activo: true,
      usosActuales: 24,
      usosMaximos: 250,
    },
    {
      id: "cup-4",
      codigo: "SAZON300",
      marca: "Sa·zón Nutresa",
      titulo: "Bono especial de puntos Sa·zón",
      beneficio: "+300 puntos Sa·zón acreditados para premios del catálogo",
      categoria: "Puntos Sa·zón",
      descuento: "+300 PTS",
      fechaInicio: obtenerFechaLocalISO(-20),
      fechaFin: obtenerFechaLocalISO(60),
      activo: true,
      usosActuales: 41,
      usosMaximos: 1000,
    },
    {
      id: "cup-5",
      codigo: "FESTIVAL2025",
      marca: "Corona",
      titulo: "Festival del Chocolate 2025",
      beneficio: "25% de descuento en Chocolate Corona tradicional",
      categoria: "Descuentos",
      descuento: "25% DCTO",
      fechaInicio: "2025-10-01",
      fechaFin: "2025-12-31",
      activo: true,
      usosActuales: 100,
      usosMaximos: 100,
    },
  ];
}

const BANNERS_PROMOCIONALES = [
  {
    id: "banner-nutresa-20",
    marca: "Zenú · Doria",
    categoria: "Descuentos",
    titulo: "Almuerzos en familia con hasta 20% de ahorro",
    subtitulo:
      "Combina tus pastas Doria favoritas con proteínas Zenú y desbloquea beneficios exclusivos en tu mercado semanal.",
    codigo: "NUTRESA20",
    etiquetaBeneficio: "20% DCTO",
    fechaFinOffset: 45,
    acentoHex: "#D32F2F",
    gradiente:
      "linear-gradient(135deg, #1B4332 0%, #215B33 55%, #3D8E33 100%)",
    icono: "bi-bag-heart-fill",
  },
  {
    id: "banner-pietran-15",
    marca: "Pietrán",
    categoria: "Descuentos",
    titulo: "Nutrición consciente para cada día",
    subtitulo:
      "Aprovecha 15% de descuento en referencias seleccionadas bajas en grasa y altas en proteína para tus recetas.",
    codigo: "PIETRAN15",
    etiquetaBeneficio: "15% DCTO",
    fechaFinOffset: 30,
    acentoHex: "#2E7D32",
    gradiente:
      "linear-gradient(135deg, #114622 0%, #1B4332 60%, #2E7D32 100%)",
    icono: "bi-heart-pulse-fill",
  },
  {
    id: "banner-jet-noel",
    marca: "Jet · Noel",
    categoria: "Combos",
    titulo: "Tardes dulces 2x1 para compartir",
    subtitulo:
      "Redime tu cupón promocional y lleva el doble de sabor en chocolatinas Jet y galletas Noel seleccionadas.",
    codigo: "CHOCOJET2X1",
    etiquetaBeneficio: "2x1 COMBO",
    fechaFinOffset: 20,
    acentoHex: "#C2185B",
    gradiente:
      "linear-gradient(135deg, #643B22 0%, #4A2B18 55%, #1B4332 100%)",
    icono: "bi-gift-fill",
  },
  {
    id: "banner-puntos-300",
    marca: "Ecosistema Sa·zón",
    categoria: "Puntos Sa·zón",
    titulo: "Suma +300 puntos Sa·zón al instante",
    subtitulo:
      "Impulsa tu saldo en el programa de lealtad y acércate más rápido a tus premios de marcas Nutresa.",
    codigo: "SAZON300",
    etiquetaBeneficio: "+300 PTS",
    fechaFinOffset: 60,
    acentoHex: "#7FBA00",
    gradiente:
      "linear-gradient(135deg, #133326 0%, #1B4332 50%, #3D8E33 100%)",
    icono: "bi-stars",
  },
];

const CATEGORIAS_FILTRO = ["Todas", "Descuentos", "Combos", "Puntos Sa·zón"];

function leerCuponesDeStorage() {
  if (typeof localStorage === "undefined") {
    return construirCuponesIniciales();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUPONES);
    if (!raw) {
      const semilla = construirCuponesIniciales();
      localStorage.setItem(STORAGE_KEY_CUPONES, JSON.stringify(semilla));
      return semilla;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const semilla = construirCuponesIniciales();
      localStorage.setItem(STORAGE_KEY_CUPONES, JSON.stringify(semilla));
      return semilla;
    }
    return parsed;
  } catch {
    const semilla = construirCuponesIniciales();
    try {
      localStorage.setItem(STORAGE_KEY_CUPONES, JSON.stringify(semilla));
    } catch {
    }
    return semilla;
  }
}

function leerRedimidosDeStorage() {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REDIMIDOS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizarFechaISO(valor) {
  if (!valor) return null;
  const texto = String(valor).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(texto)) return texto;
  const fecha = new Date(texto);
  if (Number.isNaN(fecha.getTime())) return null;
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

export default function CuponesBanners() {
  const [cuponesDisponibles, setCuponesDisponibles] = useState(() =>
    leerCuponesDeStorage()
  );
  const [cuponesRedimidos, setCuponesRedimidos] = useState(() =>
    leerRedimidosDeStorage()
  );
  const [indiceBannerActivo, setIndiceBannerActivo] = useState(0);
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [codigoInput, setCodigoInput] = useState("");
  const [codigoCopiado, setCodigoCopiado] = useState("");
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    setCuponesDisponibles(leerCuponesDeStorage());
    setCuponesRedimidos(leerRedimidosDeStorage());
  }, []);

  const bannerDestacado =
    BANNERS_PROMOCIONALES[indiceBannerActivo] || BANNERS_PROMOCIONALES[0];

  const bannersFiltrados =
    categoriaActiva === "Todas"
      ? BANNERS_PROMOCIONALES
      : BANNERS_PROMOCIONALES.filter((b) => b.categoria === categoriaActiva);

  const notificarToast = (texto) => {
    if (
      typeof window !== "undefined" &&
      typeof window.showToast === "function"
    ) {
      window.showToast(texto);
    }
  };

  const handleAnteriorBanner = () => {
    setIndiceBannerActivo((prev) =>
      prev === 0 ? BANNERS_PROMOCIONALES.length - 1 : prev - 1
    );
  };

  const handleSiguienteBanner = () => {
    setIndiceBannerActivo((prev) =>
      prev === BANNERS_PROMOCIONALES.length - 1 ? 0 : prev + 1
    );
  };

  const handleCopiarCodigo = async (codigo) => {
    setCodigoCopiado(codigo);
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(codigo);
      }
    } catch {
    }
    notificarToast(`Código ${codigo} copiado`);
    setTimeout(() => {
      setCodigoCopiado((actual) => (actual === codigo ? "" : actual));
    }, 2000);
  };

  const handleUsarCuponDeBanner = (codigo) => {
    setCodigoInput(codigo);
    setMensaje(null);
    handleCopiarCodigo(codigo);
    const inputEl = document.getElementById("codigo-cupon-input");
    if (inputEl) {
      inputEl.focus();
      inputEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleRedimirCupon = (evento) => {
    evento.preventDefault();
    const codigoNormalizado = codigoInput.trim().toUpperCase();

    if (!codigoNormalizado) {
      setMensaje({
        tipo: "error",
        titulo: "Código requerido",
        detalle: "Ingresa un código de cupón para validar su existencia y vigencia.",
      });
      return;
    }

    const listaCupones = leerCuponesDeStorage();
    setCuponesDisponibles(listaCupones);

    const cuponEncontrado = listaCupones.find((item) => {
      const codigoItem = String(item.codigo || item.code || "")
        .trim()
        .toUpperCase();
      return codigoItem === codigoNormalizado;
    });

    if (!cuponEncontrado) {
      const textoError = `El cupón "${codigoNormalizado}" no existe en sazon_cupones.`;
      setMensaje({
        tipo: "error",
        titulo: "Cupón no encontrado",
        detalle: textoError,
      });
      notificarToast(textoError);
      return;
    }

    const estaInactivo =
      cuponEncontrado.activo === false ||
      cuponEncontrado.estado === "inactivo" ||
      cuponEncontrado.estado === "vencido" ||
      cuponEncontrado.estado === "agotado";

    if (estaInactivo) {
      const textoError = `El cupón "${codigoNormalizado}" no se encuentra activo para redención.`;
      setMensaje({
        tipo: "error",
        titulo: "Cupón inactivo",
        detalle: textoError,
      });
      notificarToast(textoError);
      return;
    }

    const hoyISO = obtenerFechaLocalISO(0);
    const fechaInicioISO = normalizarFechaISO(
      cuponEncontrado.fechaInicio || cuponEncontrado.vigenciaDesde
    );
    const fechaFinISO = normalizarFechaISO(
      cuponEncontrado.fechaFin ||
        cuponEncontrado.fechaVencimiento ||
        cuponEncontrado.vigencia ||
        cuponEncontrado.vence
    );

    if (fechaInicioISO && hoyISO < fechaInicioISO) {
      const textoError = `El cupón "${codigoNormalizado}" aún no está vigente. Inicia el ${fechaInicioISO}.`;
      setMensaje({
        tipo: "error",
        titulo: "Cupón aún no vigente",
        detalle: textoError,
      });
      notificarToast(textoError);
      return;
    }

    if (fechaFinISO && hoyISO > fechaFinISO) {
      const textoError = `El cupón "${codigoNormalizado}" expiró el ${fechaFinISO} y ya no está vigente.`;
      setMensaje({
        tipo: "error",
        titulo: "Cupón vencido",
        detalle: textoError,
      });
      notificarToast(textoError);
      return;
    }

    const usosActuales = Number(cuponEncontrado.usosActuales || 0);
    const usosMaximos =
      typeof cuponEncontrado.usosMaximos === "number"
        ? cuponEncontrado.usosMaximos
        : null;

    if (usosMaximos !== null && usosActuales >= usosMaximos) {
      const textoError = `El cupón "${codigoNormalizado}" alcanzó el máximo de redenciones disponibles.`;
      setMensaje({
        tipo: "error",
        titulo: "Cupón agotado",
        detalle: textoError,
      });
      notificarToast(textoError);
      return;
    }

    const yaRedimido = cuponesRedimidos.some(
      (r) => String(r.codigo).toUpperCase() === codigoNormalizado
    );

    if (yaRedimido) {
      const textoError = `Ya redimiste el cupón "${codigoNormalizado}" en tu cuenta.`;
      setMensaje({
        tipo: "error",
        titulo: "Cupón ya redimido",
        detalle: textoError,
      });
      notificarToast(textoError);
      return;
    }

    const cuponesActualizados = listaCupones.map((item) => {
      const codigoItem = String(item.codigo || item.code || "")
        .trim()
        .toUpperCase();
      if (codigoItem !== codigoNormalizado) return item;
      return {
        ...item,
        usosActuales: Number(item.usosActuales || 0) + 1,
      };
    });

    try {
      localStorage.setItem(
        STORAGE_KEY_CUPONES,
        JSON.stringify(cuponesActualizados)
      );
    } catch {
    }
    setCuponesDisponibles(cuponesActualizados);

    const registroRedimido = {
      id: `${codigoNormalizado}-${Date.now()}`,
      codigo: codigoNormalizado,
      marca: cuponEncontrado.marca || "Grupo Nutresa",
      titulo: cuponEncontrado.titulo || "Beneficio promocional Sa·zón",
      beneficio:
        cuponEncontrado.beneficio ||
        cuponEncontrado.descripcion ||
        "Descuento especial aplicado",
      descuento: cuponEncontrado.descuento || "Beneficio",
      fechaFin: fechaFinISO || "Sin vencimiento próximo",
      fechaRedencion: hoyISO,
    };

    const nuevosRedimidos = [registroRedimido, ...cuponesRedimidos];
    setCuponesRedimidos(nuevosRedimidos);
    try {
      localStorage.setItem(
        STORAGE_KEY_REDIMIDOS,
        JSON.stringify(nuevosRedimidos)
      );
    } catch {
    }

    setCodigoInput("");
    const textoExito = `Beneficio desbloqueado: ${registroRedimido.beneficio}.`;
    setMensaje({
      tipo: "exito",
      titulo: `Cupón ${codigoNormalizado} redimido con éxito`,
      detalle: textoExito,
      beneficio: registroRedimido.descuento,
    });
    notificarToast(`¡Cupón ${codigoNormalizado} redimido!`);
  };

  const cuponesVigentesCount = cuponesDisponibles.filter((c) => {
    const fin = normalizarFechaISO(
      c.fechaFin || c.fechaVencimiento || c.vigencia || c.vence
    );
    const hoy = obtenerFechaLocalISO(0);
    return c.activo !== false && (!fin || fin >= hoy);
  }).length;

  return (
    <main
      aria-labelledby="cupones-banners-titulo"
      className="min-h-screen bg-sazon-marfil dark:bg-sazon-verdeNutresa text-slate-900 dark:text-slate-100 py-6 px-4 sm:px-6 lg:px-8"
    >
      <section className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-6">
          <section className="space-y-2 max-w-2xl">
            <p className="text-xs font-mono-tag uppercase tracking-wider text-sazon-verdeHoja dark:text-sazon-verdeNeon m-0">
              Mercadeo y Campañas · Beneficios Sa·zón
            </p>
            <h1
              id="cupones-banners-titulo"
              className="font-poppins font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight m-0"
              style={{ textWrap: "balance" }}
            >
              Promociones y Redención de Cupones
            </h1>
            <p className="font-inter text-sm sm:text-base text-slate-600 dark:text-slate-300 m-0 leading-relaxed">
              Explora las campañas vigentes de nuestras marcas aliadas e ingresa
              tu código promocional para activar descuentos y puntos especiales.
            </p>
          </section>

          <dl className="flex items-center gap-6 m-0 shrink-0">
            <section className="space-y-0.5">
              <dt className="text-[11px] font-mono-tag uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Promociones activas
              </dt>
              <dd className="font-poppins font-bold text-xl text-slate-900 dark:text-white m-0 tabular-nums">
                {cuponesVigentesCount}
              </dd>
            </section>
            <section className="space-y-0.5 border-l border-slate-200 dark:border-white/15 pl-6">
              <dt className="text-[11px] font-mono-tag uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Mis beneficios
              </dt>
              <dd className="font-poppins font-bold text-xl text-sazon-verdeHoja dark:text-sazon-verdeNeon m-0 tabular-nums">
                {cuponesRedimidos.length}
              </dd>
            </section>
          </dl>
        </header>
        <section
          aria-label="Promoción destacada y redención de cupones"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          <article
            aria-roledescription="carrusel"
            aria-label="Banner promocional destacado"
            className="lg:col-span-7 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col justify-between gap-6 relative overflow-hidden"
            style={{ background: bannerDestacado.gradiente }}
          >
            <header className="flex items-center justify-between gap-4">
              <p className="text-xs font-mono-tag uppercase tracking-wider text-white/85 m-0">
                {bannerDestacado.marca} · {bannerDestacado.categoria}
              </p>
              <strong className="font-mono-tag text-xs px-2.5 py-1 rounded-md bg-white/15 text-white border border-white/20 whitespace-nowrap shrink-0">
                {bannerDestacado.etiquetaBeneficio}
              </strong>
            </header>

            <section className="space-y-3 max-w-xl">
              <span
                aria-hidden="true"
                className="w-11 h-11 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-xl text-white"
              >
                <i className={`bi ${bannerDestacado.icono}`}></i>
              </span>
              <h2
                className="font-poppins font-extrabold text-2xl sm:text-3xl text-white leading-tight m-0"
                style={{ textWrap: "balance" }}
              >
                {bannerDestacado.titulo}
              </h2>
              <p className="font-inter text-sm sm:text-base text-white/90 leading-relaxed m-0">
                {bannerDestacado.subtitulo}
              </p>
            </section>

            <footer className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <section className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleUsarCuponDeBanner(bannerDestacado.codigo)}
                  className="px-4 py-2.5 rounded-xl bg-white text-sazon-verdeNutresa font-poppins text-xs font-bold shadow-sm hover:bg-slate-100 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <i className="bi bi-ticket-perforated-fill" aria-hidden="true"></i>
                  <span>Usar cupón {bannerDestacado.codigo}</span>
                </button>
                <time
                  dateTime={obtenerFechaLocalISO(bannerDestacado.fechaFinOffset)}
                  className="font-mono-tag text-xs text-white/80"
                >
                  Vence {obtenerFechaLocalISO(bannerDestacado.fechaFinOffset)}
                </time>
              </section>

              <nav
                aria-label="Navegación de banners"
                className="flex items-center gap-2 shrink-0"
              >
                <button
                  type="button"
                  aria-label="Banner anterior"
                  onClick={handleAnteriorBanner}
                  className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="bi bi-chevron-left" aria-hidden="true"></i>
                </button>
                <span className="font-mono-tag text-xs text-white/90 px-1.5 tabular-nums">
                  {indiceBannerActivo + 1} / {BANNERS_PROMOCIONALES.length}
                </span>
                <button
                  type="button"
                  aria-label="Siguiente banner"
                  onClick={handleSiguienteBanner}
                  className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="bi bi-chevron-right" aria-hidden="true"></i>
                </button>
              </nav>
            </footer>
          </article>

          <section
            aria-labelledby="redencion-titulo"
            className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-white dark:bg-sazon-verdeNutresaCard border border-slate-200/90 dark:border-emerald-900/50 shadow-sm flex flex-col justify-between gap-5"
          >
            <header className="space-y-1.5">
              <h2
                id="redencion-titulo"
                className="font-poppins font-bold text-xl text-slate-900 dark:text-white m-0 flex items-center gap-2"
              >
                <i
                  className="bi bi-ticket-detailed text-sazon-verdeHoja dark:text-sazon-verdeNeon"
                  aria-hidden="true"
                ></i>
                <span>Canjear código promocional</span>
              </h2>
              <p className="font-inter text-xs sm:text-sm text-slate-600 dark:text-slate-300 m-0">
                Validamos al instante la existencia y vigencia de tu cupón en{" "}
                <code className="font-mono-tag text-xs text-sazon-verdeHondo dark:text-sazon-verdeNeon">
                  sazon_cupones
                </code>
                .
              </p>
            </header>

            <form
              onSubmit={handleRedimirCupon}
              noValidate
              className="space-y-4"
            >
              <fieldset className="border-0 p-0 m-0 space-y-2">
                <legend className="sr-only">
                  Ingreso de código de cupón de descuento
                </legend>
                <label
                  htmlFor="codigo-cupon-input"
                  className="block font-mono-tag text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  Código del cupón
                </label>

                <section className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    id="codigo-cupon-input"
                    name="codigoCupon"
                    type="text"
                    value={codigoInput}
                    onChange={(e) => {
                      setCodigoInput(e.target.value.toUpperCase());
                      if (mensaje) setMensaje(null);
                    }}
                    placeholder="Ej: NUTRESA20"
                    autoComplete="off"
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-sazon-verdeNutresa border border-slate-300 dark:border-emerald-800 text-sm font-mono-tag uppercase tracking-wider text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sazon-verdeHoja"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-sazon-verdeHoja hover:bg-sazon-verdeHondo text-white font-poppins text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Redimir</span>
                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                  </button>
                </section>
              </fieldset>

              {mensaje && (
                <output
                  role="status"
                  aria-live="polite"
                  data-estado={mensaje.tipo}
                  className="block rounded-2xl p-4 border-2 transition-all"
                  style={
                    mensaje.tipo === "exito"
                      ? {
                          borderColor: "var(--lima, #7FBA00)",
                          backgroundColor:
                            "color-mix(in srgb, var(--lima, #7FBA00) 14%, transparent)",
                        }
                      : {
                          borderColor: "var(--rojo-nutresa, #D32F2F)",
                          backgroundColor:
                            "color-mix(in srgb, var(--rojo-nutresa, #D32F2F) 12%, transparent)",
                        }
                  }
                >
                  <article className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 mt-0.5"
                      style={
                        mensaje.tipo === "exito"
                          ? {
                              backgroundColor: "var(--lima, #7FBA00)",
                              color: "#114622",
                            }
                          : {
                              backgroundColor: "var(--rojo-nutresa, #D32F2F)",
                              color: "#FFFFFF",
                            }
                      }
                    >
                      <i
                        className={`bi ${
                          mensaje.tipo === "exito"
                            ? "bi-check-circle-fill"
                            : "bi-exclamation-octagon-fill"
                        }`}
                      ></i>
                    </span>

                    <section className="space-y-1 min-w-0">
                      <h3
                        className="font-poppins font-bold text-sm m-0"
                        style={{
                          color:
                            mensaje.tipo === "exito"
                              ? "var(--lima, #7FBA00)"
                              : "var(--rojo-nutresa, #D32F2F)",
                        }}
                      >
                        {mensaje.titulo}
                      </h3>
                      <p className="font-inter text-xs text-slate-800 dark:text-slate-100 m-0 leading-relaxed">
                        {mensaje.detalle}
                      </p>
                    </section>
                  </article>
                </output>
              )}
            </form>

            <footer className="pt-3 border-t border-slate-100 dark:border-white/10 space-y-2">
              <p className="font-mono-tag text-[11px] text-slate-500 dark:text-slate-400 m-0">
                Códigos rápidos para probar validación:
              </p>
              <nav
                aria-label="Códigos de ejemplo"
                className="flex flex-wrap gap-2"
              >
                {["NUTRESA20", "SAZON300", "FESTIVAL2025", "NOEXISTE"].map(
                  (codigoEjemplo) => (
                    <button
                      key={codigoEjemplo}
                      type="button"
                      onClick={() => handleUsarCuponDeBanner(codigoEjemplo)}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono-tag border border-slate-200 dark:border-emerald-800/70 bg-slate-50 dark:bg-sazon-verdeNutresa text-slate-700 dark:text-slate-200 hover:border-sazon-verdeHoja transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {codigoEjemplo}
                    </button>
                  )
                )}
              </nav>
            </footer>
          </section>
        </section>


        <section
          aria-labelledby="catalogo-banners-titulo"
          className="space-y-5"
        >
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-4">
            <section className="space-y-0.5">
              <h2
                id="catalogo-banners-titulo"
                className="font-poppins font-bold text-xl text-slate-900 dark:text-white m-0"
              >
                Campañas promocionales activas
              </h2>
              <p className="font-inter text-xs text-slate-600 dark:text-slate-300 m-0">
                Selecciona una promoción para cargar su cupón directamente
              </p>
            </section>

            <nav
              aria-label="Filtrar banners por categoría"
              className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-sazon-verdeNutresaCard border border-slate-200 dark:border-emerald-900/50 overflow-x-auto"
            >
              {CATEGORIAS_FILTRO.map((cat) => {
                const estaActiva = categoriaActiva === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={estaActiva}
                    onClick={() => setCategoriaActiva(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono-tag font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      estaActiva
                        ? "bg-sazon-verdeHoja text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </nav>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 list-none p-0 m-0">
            {bannersFiltrados.map((banner) => {
              const fechaVencimiento = obtenerFechaLocalISO(
                banner.fechaFinOffset
              );
              const fueCopiado = codigoCopiado === banner.codigo;

              return (
                <li key={banner.id}>
                  <article className="h-full rounded-2xl bg-white dark:bg-sazon-verdeNutresaCard border border-slate-200/90 dark:border-emerald-900/50 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between gap-5">
                    <section className="space-y-3">
                      <header className="flex items-center justify-between gap-3">
                        <p className="text-xs font-mono-tag text-slate-500 dark:text-slate-300 m-0">
                          {banner.marca} <span aria-hidden="true">·</span>{" "}
                          {banner.categoria}
                        </p>
                        <strong
                          className="font-mono-tag text-xs px-2.5 py-0.5 rounded-md text-white whitespace-nowrap shrink-0"
                          style={{ backgroundColor: banner.acentoHex }}
                        >
                          {banner.etiquetaBeneficio}
                        </strong>
                      </header>

                      <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white m-0 leading-snug">
                        {banner.titulo}
                      </h3>

                      <p className="font-inter text-xs sm:text-sm text-slate-600 dark:text-slate-300 m-0 leading-relaxed">
                        {banner.subtitulo}
                      </p>
                    </section>

                    <footer className="pt-4 border-t border-slate-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <section className="flex items-center gap-2">
                        <code className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-sazon-verdeNutresa border border-dashed border-slate-300 dark:border-emerald-700 font-mono-tag text-xs font-bold text-slate-900 dark:text-sazon-verdeNeon">
                          {banner.codigo}
                        </code>
                        <button
                          type="button"
                          onClick={() => handleCopiarCodigo(banner.codigo)}
                          aria-label={`Copiar código ${banner.codigo}`}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-emerald-800 text-xs font-mono-tag text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <i
                            className={`bi ${
                              fueCopiado ? "bi-clipboard-check" : "bi-clipboard"
                            } mr-1`}
                            aria-hidden="true"
                          ></i>
                          <span>{fueCopiado ? "Copiado" : "Copiar"}</span>
                        </button>
                      </section>

                      <section className="flex items-center gap-3">
                        <time
                          dateTime={fechaVencimiento}
                          className="font-mono-tag text-[11px] text-slate-500 dark:text-slate-400"
                        >
                          Vence {fechaVencimiento}
                        </time>
                        <button
                          type="button"
                          onClick={() => handleUsarCuponDeBanner(banner.codigo)}
                          className="px-3.5 py-2 rounded-xl bg-sazon-verdeHoja hover:bg-sazon-verdeHondo text-white font-poppins text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                        >
                          Aplicar
                        </button>
                      </section>
                    </footer>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          aria-labelledby="historial-cupones-titulo"
          className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-sazon-verdeNutresaCard border border-slate-200/90 dark:border-emerald-900/50 shadow-xs space-y-4"
        >
          <header className="flex items-center justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-3">
            <h2
              id="historial-cupones-titulo"
              className="font-poppins font-bold text-lg text-slate-900 dark:text-white m-0 flex items-center gap-2"
            >
              <i
                className="bi bi-shield-check text-sazon-verdeHoja dark:text-sazon-verdeNeon"
                aria-hidden="true"
              ></i>
              <span>Tus beneficios activados</span>
            </h2>
            <span className="font-mono-tag text-xs text-slate-500 dark:text-slate-400 tabular-nums">
              {cuponesRedimidos.length}{" "}
              {cuponesRedimidos.length === 1 ? "cupón" : "cupones"}
            </span>
          </header>

          {cuponesRedimidos.length === 0 ? (
            <p className="font-inter text-sm text-slate-600 dark:text-slate-300 m-0 py-2">
              Aún no has redimido cupones. Selecciona cualquiera de los banners
              promocionales o escribe tu código arriba para desbloquear un
              beneficio especial.
            </p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 m-0">
              {cuponesRedimidos.map((item) => (
                <li key={item.id}>
                  <article className="rounded-2xl p-4 bg-slate-50 dark:bg-sazon-verdeNutresa border border-slate-200/80 dark:border-emerald-800/60 flex items-start justify-between gap-3">
                    <section className="space-y-1">
                      <p className="font-mono-tag text-[11px] text-slate-500 dark:text-slate-300 m-0">
                        {item.marca} <span aria-hidden="true">·</span> Redimido
                        el <time dateTime={item.fechaRedencion}>{item.fechaRedencion}</time>
                      </p>
                      <h3 className="font-poppins font-bold text-sm text-slate-900 dark:text-white m-0">
                        {item.beneficio}
                      </h3>
                      <p className="font-mono-tag text-[11px] text-slate-500 dark:text-slate-400 m-0">
                        Código: <code>{item.codigo}</code> · Vigente hasta{" "}
                        <time dateTime={item.fechaFin}>{item.fechaFin}</time>
                      </p>
                    </section>
                    <strong
                      className="font-mono-tag text-xs px-2.5 py-1 rounded-md shrink-0"
                      style={{
                        backgroundColor: "var(--lima, #7FBA00)",
                        color: "#114622",
                      }}
                    >
                      {item.descuento}
                    </strong>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  );
}