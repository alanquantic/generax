import rawProducts from "../../generax-mx/products.json";

type RawProduct = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  regular_price: string;
  currency: string;
  short_description: string;
  description: string;
  categories: string[];
  images: string[];
};

export type Product = {
  id: number;
  name: string;
  shortName: string;
  slug: string;
  routeSlug: string;
  permalink: string;
  price: number;
  currency: string;
  formattedPrice: string;
  summary: string;
  specs: string[];
  categories: string[];
  image: string;
  gallery: string[];
  capacityKw: number;
  kva: number | null;
  fuel: string;
  voltage: string;
  motor: string;
  segment: string;
};

function stripTags(input: string) {
  return input
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#36;/g, "$")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, "-")
    .replace(/&#8217;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractListItems(input: string) {
  return Array.from(input.matchAll(/<li>(.*?)<\/li>/gi))
    .map((match) => stripTags(match[1]))
    .filter(Boolean);
}

function extractCapacity(name: string) {
  const kwMatch = name.match(/(\d+)\s*KW/i);
  return kwMatch ? Number(kwMatch[1]) : 0;
}

function extractKva(name: string) {
  const kvaMatch = name.match(/(\d+)\s*KVA/i);
  return kvaMatch ? Number(kvaMatch[1]) : null;
}

function inferFuel(specs: string[], name: string) {
  const haystack = `${name} ${specs.join(" ")}`.toLowerCase();
  if (haystack.includes("gas lp") || haystack.includes("natural")) return "Gas LP / Natural";
  if (haystack.includes("diesel")) return "Diésel";
  return "A definir";
}

function inferVoltage(specs: string[]) {
  const voltage = specs.find((item) => item.toLowerCase().includes("voltaje"));
  return voltage ? voltage.split(":").slice(1).join(":").trim() : "220/127 V";
}

function inferMotor(specs: string[], name: string) {
  const fromSpecs = specs.find((item) => item.toLowerCase().includes("motor"));
  if (fromSpecs) return fromSpecs.split(":").slice(1).join(":").trim();
  if (name.toLowerCase().includes("cummins")) return "Cummins";
  return "Generax / configurable";
}

function inferSegment(capacityKw: number) {
  if (capacityKw <= 50) return "Respaldo comercial y pequeño industrial";
  if (capacityKw <= 170) return "Operación industrial media";
  if (capacityKw <= 300) return "Operación crítica y proyectos especiales";
  return "Infraestructura de alta demanda";
}

function shortenName(name: string) {
  return name
    .replace("Generador Eléctrico ", "")
    .replace(" Marca Generax", "")
    .replace(" Con Caseta Nuevo", "")
    .replace(" Motor Cummins", "")
    .trim();
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildRouteSlug(capacityKw: number, kva: number | null, fuel: string, motor: string) {
  const parts = ["generador", `${capacityKw}kw`];
  if (kva) parts.push(`${kva}kva`);
  parts.push(slugify(fuel === "Gas LP / Natural" ? "gas-lp-natural" : fuel));

  if (motor.toLowerCase().includes("cummins")) {
    parts.push("cummins");
  }

  return parts.join("-");
}

function imagePath(url: string) {
  const fileName = url.split("/").pop();
  return fileName ? `/media/${fileName}` : "/media/placeholder.png";
}

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function descriptionSummary(description: string) {
  const clean = stripTags(description);
  const sentences = clean.split(". ").slice(0, 1).join(". ");
  return sentences.endsWith(".") ? sentences : `${sentences}.`;
}

const products = (rawProducts as RawProduct[])
  .map((product) => {
    const specs = extractListItems(product.description);
    const capacityKw = extractCapacity(product.name);

    return {
      id: product.id,
      name: product.name,
      shortName: shortenName(product.name),
      slug: product.slug,
      routeSlug: buildRouteSlug(capacityKw, extractKva(product.name), inferFuel(specs, product.name), inferMotor(specs, product.name)),
      permalink: product.permalink,
      price: Number(product.price || 0),
      currency: product.currency,
      formattedPrice: formatPrice(Number(product.price || 0), product.currency),
      summary: descriptionSummary(product.description),
      specs,
      categories: product.categories,
      image: imagePath(product.images[0] || ""),
      gallery: product.images.map(imagePath),
      capacityKw,
      kva: extractKva(product.name),
      fuel: inferFuel(specs, product.name),
      voltage: inferVoltage(specs),
      motor: inferMotor(specs, product.name),
      segment: inferSegment(capacityKw),
    } satisfies Product;
  })
  .sort((left, right) => left.capacityKw - right.capacityKw);

export { products };

export const featuredProducts = products.filter((product) =>
  [20, 110, 220, 500].includes(product.capacityKw),
);

export const generatorComparisons = [
  {
    label: "Combustible",
    details: "Gas LP / natural para aplicaciones limpias o diésel para autonomía y carga pesada.",
  },
  {
    label: "Capacidad",
    details: "Desde respaldo comercial hasta infraestructura de alta demanda con crecimiento escalable.",
  },
  {
    label: "Control",
    details: "Configuraciones con ATS, tablero automático y monitoreo remoto para operación crítica.",
  },
  {
    label: "Aplicación",
    details: "Hoteles, salud, manufactura, construcción, retail y logística con necesidades distintas.",
  },
];
