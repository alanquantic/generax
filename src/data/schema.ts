import type { Product } from "./catalog";
import { siteConfig } from "./site";

const CURRENT_YEAR = new Date().getFullYear();
const ISO_TODAY = new Date().toISOString().slice(0, 10);

export function organizationSchema() {
  return {
    "@type": ["Organization", "Corporation"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    alternateName: ["GENERAX", "Generax Power", "Generax México"],
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteConfig.url}/#logo`,
      url: `${siteConfig.url}${siteConfig.logo}`,
      contentUrl: `${siteConfig.url}${siteConfig.logo}`,
      caption: siteConfig.legalName,
      inLanguage: "es-MX",
    },
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    description: siteConfig.description,
    telephone: siteConfig.telephone,
    address: {
      "@type": "PostalAddress",
      addressCountry: "MX",
      addressRegion: "Nuevo León",
      addressLocality: "Monterrey",
    },
    areaServed: {
      "@type": "Country",
      name: "México",
      "@id": "https://www.wikidata.org/wiki/Q96",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: siteConfig.telephone,
        areaServed: "MX",
        availableLanguage: ["es"],
        contactOption: "TollFree",
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: `+52 ${siteConfig.whatsappDisplay.replace("+52 ", "")}`,
        areaServed: "MX",
        availableLanguage: ["es"],
      },
    ],
    slogan: "Soluciones de energía para continuidad operativa",
    knowsAbout: [
      "Generadores eléctricos industriales",
      "Transformadores eléctricos",
      "Energía de respaldo",
      "Continuidad operativa",
      "Mantenimiento de generadores",
      "Infraestructura eléctrica industrial",
    ],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
    foundingLocation: {
      "@type": "Place",
      name: "Monterrey, Nuevo León, México",
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    alternateName: "GENERAX Power",
    description: siteConfig.description,
    inLanguage: "es-MX",
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      "@type": "ReadAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/generadores/`,
      },
    },
  };
}

interface WebPageOptions {
  name: string;
  description: string;
  path: string;
  type?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  speakableSelectors?: string[];
}

export function webPageSchema(opts: WebPageOptions): Record<string, unknown>;
export function webPageSchema(
  name: string,
  description: string,
  path: string,
  type?: string,
): Record<string, unknown>;
export function webPageSchema(
  nameOrOpts: string | WebPageOptions,
  description?: string,
  path?: string,
  type?: string,
): Record<string, unknown> {
  const opts: WebPageOptions =
    typeof nameOrOpts === "string"
      ? {
          name: nameOrOpts,
          description: description!,
          path: path!,
          type: type || "WebPage",
        }
      : nameOrOpts;

  const pageType = opts.type || "WebPage";
  const url = `${siteConfig.url}${opts.path}`;
  const published = opts.datePublished || "2025-01-01";
  const modified = opts.dateModified || ISO_TODAY;
  const selectors = opts.speakableSelectors || [
    ".page-hero h1",
    ".page-hero p",
    ".hero__copy h1",
    ".hero__copy p",
  ];

  return {
    "@type": pageType,
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "es-MX",
    datePublished: published,
    dateModified: modified,
    ...(opts.image
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: opts.image.startsWith("http")
              ? opts.image
              : `${siteConfig.url}${opts.image}`,
          },
        }
      : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: selectors,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  const firstPath = items.length > 0 ? items[items.length - 1].path : "/";
  return {
    "@type": "BreadcrumbList",
    "@id": `${siteConfig.url}${firstPath}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http")
        ? item.path
        : `${siteConfig.url}${item.path}`,
    })),
  };
}

export function serviceSchema(
  name: string,
  description: string,
  path: string,
) {
  return {
    "@type": "Service",
    "@id": `${siteConfig.url}${path}#service`,
    serviceType: name,
    name,
    description,
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "México",
    },
    url: `${siteConfig.url}${path}`,
    termsOfService: `${siteConfig.url}/contacto/`,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${siteConfig.url}${path}`,
      servicePhone: siteConfig.telephone,
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
        dateCreated: "2025-01-01",
        author: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
    })),
  };
}

export function itemListSchema(
  name: string,
  items: { name: string; path: string }[],
) {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.path.startsWith("http")
        ? item.path
        : `${siteConfig.url}${item.path}`,
    })),
  };
}

export function productSchema(product: Product) {
  const url = `${siteConfig.url}/generadores/${product.routeSlug}/`;
  const priceValidUntil = `${CURRENT_YEAR}-12-31`;

  return {
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    url,
    image: product.gallery.map((img) => `${siteConfig.url}${img}`),
    description: product.summary,
    brand: {
      "@type": "Brand",
      name: "GENERAX",
    },
    manufacturer: {
      "@id": `${siteConfig.url}/#organization`,
    },
    sku: product.slug,
    mpn: `GX-${product.capacityKw}KW-${product.fuel === "Gas LP / Natural" ? "GAS" : "DSL"}`,
    category: "Generadores eléctricos industriales",
    countryOfOrigin: {
      "@type": "Country",
      name: "México",
    },
    isSimilarTo: {
      "@type": "Product",
      name: `Generador industrial ${product.capacityKw} kW`,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Capacidad (kW)",
        value: `${product.capacityKw}`,
        unitCode: "KWT",
      },
      ...(product.kva
        ? [
            {
              "@type": "PropertyValue",
              name: "Capacidad (kVA)",
              value: `${product.kva}`,
              unitCode: "KVA",
            },
          ]
        : []),
      {
        "@type": "PropertyValue",
        name: "Combustible",
        value: product.fuel,
      },
      {
        "@type": "PropertyValue",
        name: "Voltaje",
        value: product.voltage,
      },
      {
        "@type": "PropertyValue",
        name: "Motor",
        value: product.motor,
      },
      {
        "@type": "PropertyValue",
        name: "Año",
        value: `${CURRENT_YEAR}`,
      },
      {
        "@type": "PropertyValue",
        name: "Condición",
        value: "Nuevo",
      },
    ],
    offers: {
      "@type": "Offer",
      "@id": `${url}#offer`,
      priceCurrency: product.currency,
      price: String(product.price),
      priceValidUntil,
      availability: "https://schema.org/InStock",
      url,
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@id": `${siteConfig.url}/#organization`,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "MX",
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "MX",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnNotPermitted",
      },
    },
  };
}

export function siteNavigationSchema() {
  return {
    "@type": "SiteNavigationElement",
    name: "Navegación principal",
    hasPart: [
      { "@type": "WebPage", name: "Inicio", url: `${siteConfig.url}/` },
      {
        "@type": "WebPage",
        name: "Empresa",
        url: `${siteConfig.url}/empresa/`,
      },
      {
        "@type": "WebPage",
        name: "Tienda",
        url: `${siteConfig.url}/tienda/`,
      },
      {
        "@type": "WebPage",
        name: "Generadores",
        url: `${siteConfig.url}/generadores/`,
      },
      {
        "@type": "WebPage",
        name: "Transformadores",
        url: `${siteConfig.url}/transformadores/`,
      },
      {
        "@type": "WebPage",
        name: "Soluciones",
        url: `${siteConfig.url}/soluciones/`,
      },
      {
        "@type": "WebPage",
        name: "Servicios",
        url: `${siteConfig.url}/servicios/`,
      },
      {
        "@type": "WebPage",
        name: "Contacto",
        url: `${siteConfig.url}/contacto/`,
      },
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.legalName,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    telephone: siteConfig.telephone,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressCountry: "MX",
      addressRegion: "Nuevo León",
      addressLocality: "Monterrey",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.6866,
      longitude: -100.3161,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$$$",
    currenciesAccepted: "MXN, USD",
    paymentAccepted: "Transferencia bancaria, Efectivo",
    areaServed: {
      "@type": "Country",
      name: "México",
    },
    sameAs: [],
  };
}

export function offerCatalogSchema(
  name: string,
  items: { name: string; description: string; path: string }[],
) {
  return {
    "@type": "OfferCatalog",
    name,
    itemListElement: items.map((item) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: item.name,
        description: item.description,
        url: `${siteConfig.url}${item.path}`,
      },
    })),
  };
}
