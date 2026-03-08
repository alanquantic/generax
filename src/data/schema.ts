import type { Product } from "./catalog";
import { siteConfig } from "./site";

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    telephone: siteConfig.telephone,
    areaServed: siteConfig.serviceArea,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: siteConfig.telephone,
        areaServed: "MX",
        availableLanguage: ["es-MX"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "es-MX",
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

export function webPageSchema(name: string, description: string, path: string, type = "WebPage") {
  return {
    "@type": type,
    "@id": `${siteConfig.url}${path}#webpage`,
    url: `${siteConfig.url}${path}`,
    name,
    description,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    about: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: "es-MX",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : `${siteConfig.url}${item.path}`,
    })),
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@type": "Service",
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
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function itemListSchema(name: string, items: { name: string; path: string }[]) {
  return {
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.path.startsWith("http") ? item.path : `${siteConfig.url}${item.path}`,
    })),
  };
}

export function productSchema(product: Product) {
  return {
    "@type": "Product",
    "@id": `${siteConfig.url}/generadores/${product.routeSlug}/#product`,
    name: product.name,
    url: `${siteConfig.url}/generadores/${product.routeSlug}/`,
    image: product.gallery.map((image) => `${siteConfig.url}${image}`),
    description: product.summary,
    brand: {
      "@type": "Brand",
      name: "GENERAX",
    },
    sku: product.slug,
    category: product.categories.join(", "),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Capacidad",
        value: `${product.capacityKw} kW${product.kva ? ` / ${product.kva} kVA` : ""}`,
      },
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
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: String(product.price),
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/generadores/${product.routeSlug}/`,
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}
