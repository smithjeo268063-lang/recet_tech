export type ProductInput = {
  slug: string;
  title: string;
  category: string;
  brand: string;
  price: number;
  compare_at: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  summary: string;
  tags: string[];
  features: string[];
  specifications: { label: string; value: string }[];
  inventory: number;
  is_featured: boolean;
  is_new: boolean;
  is_deal: boolean;
  is_uk_used: boolean;
  is_published: boolean;
};

export type BrandInput = {
  slug: string;
  name: string;
  description: string;
  logo: string;
  is_active: boolean;
};

export type CategoryInput = {
  slug: string;
  title: string;
  description: string;
  image: string;
  is_active: boolean;
};

export type StorefrontContent = {
  announcement: string;
  hero_title: string;
  hero_description: string;
};

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Request body must be a JSON object.");
  }
  return value as Record<string, unknown>;
}

function text(value: unknown, label: string, maximum = 1000) {
  if (typeof value !== "string" || value.trim().length === 0 || value.length > maximum) {
    throw new Error(`${label} is required and must be no more than ${maximum} characters.`);
  }
  return value.trim();
}

function optionalText(value: unknown, label: string, maximum = 1000) {
  if (value === undefined || value === null || value === "") {
    return "";
  }
  return text(value, label, maximum);
}

function numeric(value: unknown, label: string, min: number, max = Number.MAX_SAFE_INTEGER) {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
    throw new Error(`${label} must be a number between ${min} and ${max}.`);
  }
  return parsed;
}

function boolean(value: unknown, fallback = false) {
  if (value === undefined) {
    return fallback;
  }
  if (typeof value !== "boolean") {
    throw new Error("Boolean fields must be true or false.");
  }
  return value;
}

function stringArray(value: unknown, label: string) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${label} must be a list of text values.`);
  }
  return value.map((item) => item.trim()).filter(Boolean).slice(0, 100);
}

function specifications(value: unknown) {
  if (!Array.isArray(value)) {
    throw new Error("Specifications must be a list.");
  }
  return value.map((item) => {
    const entry = record(item);
    return {
      label: text(entry.label, "Specification label", 100),
      value: text(entry.value, "Specification value", 500),
    };
  }).slice(0, 100);
}

function slug(value: unknown, label: string) {
  const result = text(value, label, 160).toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(result)) {
    throw new Error(`${label} may contain only lowercase letters, numbers, and hyphens.`);
  }
  return result;
}

export function parseProduct(value: unknown): ProductInput {
  const body = record(value);
  return {
    slug: slug(body.slug, "Product slug"),
    title: text(body.title, "Product title", 200),
    category: text(body.category, "Category", 120),
    brand: text(body.brand, "Brand", 120),
    price: numeric(body.price, "Price", 0),
    compare_at: numeric(body.compare_at ?? 0, "Compare-at price", 0),
    rating: numeric(body.rating ?? 0, "Rating", 0, 5),
    reviews: numeric(body.reviews ?? 0, "Review count", 0),
    image: optionalText(body.image, "Image URL", 2000),
    images: stringArray(body.images ?? [], "Images"),
    summary: optionalText(body.summary, "Description", 5000),
    tags: stringArray(body.tags ?? [], "Tags"),
    features: stringArray(body.features ?? [], "Features"),
    specifications: specifications(body.specifications ?? []),
    inventory: numeric(body.inventory ?? 0, "Inventory", 0),
    is_featured: boolean(body.is_featured),
    is_new: boolean(body.is_new),
    is_deal: boolean(body.is_deal),
    is_uk_used: boolean(body.is_uk_used),
    is_published: boolean(body.is_published, true),
  };
}

export function parseBrand(value: unknown): BrandInput {
  const body = record(value);
  return {
    slug: slug(body.slug, "Brand slug"),
    name: text(body.name, "Brand name", 120),
    description: optionalText(body.description, "Description", 2000),
    logo: optionalText(body.logo, "Logo URL", 2000),
    is_active: boolean(body.is_active, true),
  };
}

export function parseCategory(value: unknown): CategoryInput {
  const body = record(value);
  return {
    slug: slug(body.slug, "Category slug"),
    title: text(body.title, "Category name", 120),
    description: optionalText(body.description, "Description", 2000),
    image: optionalText(body.image, "Image URL", 2000),
    is_active: boolean(body.is_active, true),
  };
}

export function parseStorefrontContent(value: unknown): StorefrontContent {
  const body = record(value);
  return {
    announcement: optionalText(body.announcement, "Announcement", 300),
    hero_title: text(body.hero_title, "Homepage headline", 200),
    hero_description: text(body.hero_description, "Homepage description", 1000),
  };
}

export function errorStatus(error: unknown) {
  if (error instanceof Error && error.name === "AdminConfigurationError") {
    return 503;
  }

  return error instanceof Error &&
    (error.message.includes("is required") ||
      error.message.includes("must be") ||
      error.message.includes("may contain"))
    ? 400
    : 500;
}
