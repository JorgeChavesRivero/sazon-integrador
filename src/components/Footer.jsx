import zenuImg from '../assets/images/zenu.png'
import doriaImg from '../assets/images/doriapng.png'
import jetImg from '../assets/images/jet.svg'
import pietranImg from '../assets/images/pietran.png'
import noelImg from '../assets/images/noel.svg'
import coronaImg from '../assets/images/corona.svg'
import novaventaImg from '../assets/images/novaventapng.png'
import nutresaImg from '../assets/images/nutresa.png'

const DEFAULT_BRANDS = [
  { name: 'Zenú', src: zenuImg, maxWidth: 'max-w-[55px]' },
  { name: 'Doria', src: doriaImg, maxWidth: 'max-w-[55px]' },
  { name: 'Jet', src: jetImg, maxWidth: 'max-w-[50px]' },
  { name: 'Pietrán', src: pietranImg, maxWidth: 'max-w-[55px]' },
  { name: 'Noel', src: noelImg, maxWidth: 'max-w-[45px]' },
  { name: 'Corona', src: coronaImg, maxWidth: 'max-w-[55px]' },
  { name: 'Novaventa', src: novaventaImg, maxWidth: 'max-w-[55px]' },
  { name: 'Grupo Nutresa', src: nutresaImg, maxWidth: 'max-w-[65px]' },
]

function Footer({
  team = 'Equipo de Desarrollo Sa·zón',
  copyright = 'Copyright © 2026 Grupo Nutresa · Todos los derechos reservados',
  brands = DEFAULT_BRANDS,
}) {
  return (
    <footer
      className="relative z-20 bg-sazon-cacao dark:bg-sazon-verdeNutresa/95 text-white/90 py-3 px-4 sm:px-8 border-t border-black/10 dark:border-white/10 transition-colors duration-300"
      id="main-footer"
    >
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pr-0 lg:pr-28">
        <article className="text-center md:text-left space-y-0.5">
          <p className="font-poppins font-bold text-xs m-0 text-white leading-tight">{team}</p>
          <p className="font-mono-tag text-[10px] text-white/70 m-0">{copyright}</p>
        </article>

        <nav className="flex flex-wrap justify-center items-center gap-2">
          {brands.map((brand) => (
            <span
              key={brand.name}
              className="h-7 px-2.5 rounded-full bg-white border border-white/20 flex items-center justify-center shadow-xs transition-all"
              title={brand.name}
            >
              <img
                alt={brand.name}
                className={`h-4 w-auto ${brand.maxWidth} object-contain`}
                src={brand.src}
              />
            </span>
          ))}
        </nav>
      </section>
    </footer>
  )
}

export default Footer
