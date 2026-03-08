export const siteConfig = {
  name: "GENERAX",
  legalName: "GENERAX Power",
  url: "https://generax.com",
  description:
    "Venta de generadores eléctricos, transformadores industriales y soluciones de energía de respaldo para industria, comercio e infraestructura crítica en México.",
  locale: "es_MX",
  telephone: "+52 81 1550 3100",
  whatsappNumber: "528124118539",
  whatsappDisplay: "+52 81 2411 8539",
  whatsappText: "Hola, necesito una cotización para un proyecto de energía.",
  serviceArea: "México",
  heroImage: "/media/GENERAX-Generador-Electrico9.jpg",
  ogImage: "/media/GENERAX-Generador-Electrico9.jpg",
  logo: "/media/generax-logo.png",
};

export function buildWhatsAppUrl(message = siteConfig.whatsappText) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildProductWhatsAppUrl(productName: string) {
  return buildWhatsAppUrl(`Hola, necesito una cotización del ${productName}.`);
}

export const navigation = [
  { href: "/empresa/", label: "Empresa" },
  { href: "/tienda/", label: "Tienda" },
  { href: "/generadores/", label: "Generadores" },
  { href: "/transformadores/", label: "Transformadores" },
  { href: "/soluciones/", label: "Soluciones" },
  { href: "/servicios/", label: "Servicios" },
];

export const trustBar = [
  "Respuesta comercial en 24 horas",
  "Sectores industriales, salud, hotelería y logística",
  "Motor Cummins y configuraciones a medida",
  "Cobertura nacional y soporte postventa",
];

export const companyMetrics = [
  { value: "24 h", label: "para respuesta comercial inicial" },
  { value: "20 - 500 kW", label: "en catálogo base de generadores" },
  { value: "5 - 3000 kVA+", label: "en transformadores y proyectos especiales" },
  { value: "Cobertura nacional", label: "para industria, comercio y sitios críticos" },
];

export const valueProps = [
  {
    title: "Asesoría técnica antes de cotizar",
    body: "Te ayudamos a definir capacidad, combustible, transferencia y forma de operación antes de seleccionar el equipo.",
  },
  {
    title: "Soluciones para continuidad operativa",
    body: "Cotizamos pensando en el impacto sobre planta, hospital, hotel, almacén o infraestructura crítica.",
  },
  {
    title: "Configuraciones a la medida",
    body: "Integramos ATS, tableros automáticos, monitoreo remoto y distintas configuraciones según el proyecto.",
  },
  {
    title: "Soporte postventa y seguimiento",
    body: "Acompañamos con puesta en marcha, mantenimiento, refacciones y atención comercial posterior a la venta.",
  },
];

export const industrySolutions = [
  {
    slug: "manufactura",
    title: "Manufactura y plantas",
    body: "Respaldo para líneas de producción, compresores, sistemas críticos y operación continua.",
  },
  {
    slug: "hospitales",
    title: "Hospitales e infraestructura crítica",
    body: "Configuraciones para cargas sensibles, ATS, monitoreo y continuidad en contingencia.",
  },
  {
    slug: "hoteles",
    title: "Hoteles y desarrollos inmobiliarios",
    body: "Energía de respaldo para huéspedes, bombas, clima, elevadores y operación comercial.",
  },
  {
    slug: "logistica",
    title: "Logística y almacenes",
    body: "Respaldo para centros de distribución, sistemas de seguridad, racks móviles y frío industrial.",
  },
  {
    slug: "construccion",
    title: "Construcción y proyectos temporales",
    body: "Soluciones móviles o fijas para obra, campamentos, soldadura y operación remota.",
  },
  {
    slug: "data-centers",
    title: "Data centers y TI",
    body: "Proyectos con redundancia, monitoreo y control para infraestructura digital sensible.",
  },
];

export const serviceOffers = [
  {
    title: "Dimensionamiento y selección",
    body: "Levantamiento comercial-técnico para definir potencia, combustible, transferencia y operación.",
  },
  {
    title: "Puesta en marcha y capacitación",
    body: "Arranque controlado, checklist y entrenamiento operativo para el equipo del cliente.",
  },
  {
    title: "Mantenimiento preventivo",
    body: "Planes por horas de uso, criticidad y condiciones del sitio para reducir paros no programados.",
  },
  {
    title: "Refacciones y postventa",
    body: "Seguimiento de componentes clave, consumibles, garantías y asistencia comercial.",
  },
];

export const transformerTypes = [
  {
    title: "Distribución",
    body: "Para plantas industriales, plazas comerciales, naves logísticas y alimentación principal.",
  },
  {
    title: "Pedestal y poste",
    body: "Soluciones exteriores de media a baja tensión con gabinete robusto y protección.",
  },
  {
    title: "Tipo seco",
    body: "Aplicaciones interiores, hospitales, centros de datos y espacios con mayores exigencias de seguridad.",
  },
  {
    title: "Especiales a medida",
    body: "Configuraciones personalizadas para maquinaria, automatización y proyectos con requerimientos específicos.",
  },
];

export const homeFaqs = [
  {
    question: "¿Qué tipo de proyectos atiende GENERAX?",
    answer:
      "Atendemos proyectos para industria, comercio, hoteles, hospitales, logística, construcción e infraestructura crítica que requieren energía de respaldo u operación continua.",
  },
  {
    question: "¿Manejan generadores diésel y gas?",
    answer:
      "Sí. Cotizamos generadores diésel y opciones a gas LP o natural según autonomía, operación, disponibilidad de combustible y criticidad del sitio.",
  },
  {
    question: "¿También cotizan transformadores y equipos especiales?",
    answer:
      "Sí. Además de generadores, atendemos transformadores de distribución, pedestal, poste, tipo seco y desarrollos a medida para cada proyecto.",
  },
  {
    question: "¿Puedo solicitar atención por WhatsApp?",
    answer:
      "Sí. Puedes abrir una conversación directa por WhatsApp desde cualquier página y compartir ahí mismo los datos principales de tu proyecto.",
  },
];

export const generatorFaqs = [
  {
    question: "¿Cómo elegir la capacidad correcta de un generador?",
    answer:
      "Se parte de la carga real, el tipo de arranque de los equipos, la simultaneidad, el crecimiento esperado y la criticidad operativa del sitio.",
  },
  {
    question: "¿Qué combustible conviene más para una operación industrial?",
    answer:
      "Depende de la autonomía requerida, la disponibilidad de combustible, el costo operativo, las normativas del sitio y las horas de uso esperadas.",
  },
  {
    question: "¿Cuándo necesito ATS y monitoreo remoto?",
    answer:
      "En operaciones que no pueden depender de intervención manual: hospitales, hoteles, manufactura continua, logística y sitios críticos.",
  },
];

export const transformerFaqs = [
  {
    question: "¿Qué ventaja aporta un transformador con devanados de cobre?",
    answer:
      "Mayor conductividad, menor calentamiento y mejor comportamiento a largo plazo frente a opciones con materiales menos robustos.",
  },
  {
    question: "¿Qué información debe traer una solicitud de cotización de transformador?",
    answer:
      "Capacidad, voltajes, configuración monofásica o trifásica, tipo de instalación, ambiente de operación y norma o condicionante del proyecto.",
  },
  {
    question: "¿El sitio puede captar proyectos especiales y no solo producto estándar?",
    answer:
      "Sí. Cotizamos tanto soluciones estándar como desarrollos especiales con capacidades, configuraciones y condiciones específicas de instalación.",
  },
];
