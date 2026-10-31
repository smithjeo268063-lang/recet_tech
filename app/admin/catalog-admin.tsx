"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent } from "react";

type CatalogProduct = {
  id: number;
  slug: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  inventory: number;
  image: string;
  is_published: boolean;
};

type CatalogEntry = {
  slug: string;
  name?: string;
  title?: string;
  description: string;
  logo?: string;
  image?: string;
  is_active: boolean;
};

type Resource = "brands" | "categories";
type Message = { error?: string; requestId?: string; stage?: string; code?: string };

async function responseData<T>(response: Response): Promise<T> {
  const body = (await response.json()) as T & Message;
  if (!response.ok) {
    const diagnostics = [
      body.stage ? `stage: ${body.stage}` : "",
      body.code ? `code: ${body.code}` : "",
      body.requestId ? `request ID: ${body.requestId}` : "",
    ].filter(Boolean);
    throw new Error([
      body.error ?? "The request could not be completed.",
      diagnostics.length > 0 ? `(${diagnostics.join(", ")})` : "",
    ].filter(Boolean).join(" "));
  }
  return body;
}

export function AdminProducts() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    console.info("[admin-products-ui] loading products");
    try {
      const response = await fetch("/api/admin/catalog/products", { cache: "no-store" });
      console.info("[admin-products-ui] products API responded", {
        status: response.status,
        requestId: response.headers.get("x-request-id"),
      });
      const result = await responseData<{ products: CatalogProduct[] }>(
        response,
      );
      setProducts(result.products);
      console.info("[admin-products-ui] products loaded", { productCount: result.products.length });
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Could not load products.";
      console.error("[admin-products-ui] product load failed", message);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    console.info("[admin-products-ui] loading products");
    fetch("/api/admin/catalog/products", { cache: "no-store" })
      .then((response) => {
        console.info("[admin-products-ui] products API responded", {
          status: response.status,
          requestId: response.headers.get("x-request-id"),
        });
        return responseData<{ products: CatalogProduct[] }>(response);
      })
      .then((result) => {
        if (active) {
          setProducts(result.products);
          console.info("[admin-products-ui] products loaded", {
            productCount: result.products.length,
          });
        }
      })
      .catch((cause: unknown) => {
        const message = cause instanceof Error ? cause.message : "Could not load products.";
        console.error("[admin-products-ui] product load failed", message);
        if (active) setError(message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function remove(id: number, title: string) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setError("");
    try {
      await responseData(await fetch(`/api/admin/catalog/products/${id}`, { method: "DELETE" }));
      setProducts((items) => items.filter((item) => item.id !== id));
      setMessage("Product deleted.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not delete product.");
    }
  }

  async function importStarterCatalog() {
    if (!window.confirm("Import the starter catalog? This adds missing entries and keeps existing catalog changes intact.")) return;
    setImporting(true);
    setError("");
    setMessage("");
    try {
      const result = await responseData<{ imported: { brands: number; categories: number; products: number } }>(
        await fetch("/api/admin/catalog/import", { method: "POST" }),
      );
      setMessage(`Imported ${result.imported.products} products, ${result.imported.brands} brands, and ${result.imported.categories} categories.`);
      await refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not import the starter catalog.");
    } finally {
      setImporting(false);
    }
  }

  const visible = products.filter((product) =>
    [product.title, product.brand, product.category, product.slug].some((value) =>
      value.toLowerCase().includes(query.trim().toLowerCase()),
    ),
  );

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Products</h2>
          <p className="mt-1 text-sm text-slate-500">{products.length} products in the database</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => void importStarterCatalog()} disabled={importing} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-60">
            {importing ? "Importing…" : "Import starter catalog"}
          </button>
          <Link href="/admin/products/new" className="rounded-full bg-[#193B8C] px-4 py-2 text-sm font-semibold text-white">Add product</Link>
        </div>
      </div>
      {error ? <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      {message ? <p role="status" className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p> : null}
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="mb-5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
      {loading ? <p className="py-8 text-sm text-slate-500">Loading products…</p> : null}
      {!loading && visible.length === 0 ? <p className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-600">No products found. Add a product or import the starter catalog.</p> : null}
      <div className="grid gap-3">
        {visible.map((product) => (
          <article key={product.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-100 p-4">
            {product.image ? <img src={product.image} alt="" className="h-16 w-16 rounded-xl bg-slate-100 object-cover" /> : <div className="h-16 w-16 rounded-xl bg-slate-100" />}
            <div className="min-w-48 flex-1">
              <h3 className="font-semibold text-slate-900">{product.title}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {product.brand} · {product.category} · {product.is_published ? `₦${Number(product.price).toLocaleString()}` : "Price not set"}
                {" · "}{product.is_published ? `${product.inventory} in stock` : "Stock not set"}
              </p>
              <p className="mt-1 text-xs text-slate-400">{product.is_published ? "Published" : "Draft"} · {product.slug}</p>
            </div>
            <Link href={`/admin/products/${product.id}/edit`} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">Edit</Link>
            <button type="button" onClick={() => void remove(product.id, product.title)} className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700">Delete</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AdminProductForm({ productId }: { productId?: string }) {
  const [product, setProduct] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(Boolean(productId));

  useEffect(() => {
    if (!productId) return;
    fetch("/api/admin/catalog/products", { cache: "no-store" })
      .then((response) => responseData<{ products: Record<string, unknown>[] }>(response))
      .then(({ products }) => {
        const match = products.find((entry) => String(entry.id) === productId);
        if (!match) throw new Error("Product not found.");
        setProduct(match);
      })
      .catch((cause: unknown) => setError(cause instanceof Error ? cause.message : "Could not load product."))
      .finally(() => setLoading(false));
  }, [productId]);

  function value(key: string, fallback = "") {
    const raw = product?.[key];
    return raw === undefined || raw === null ? fallback : String(raw);
  }

  async function upload(file: File | undefined, form: HTMLFormElement) {
    if (!file) return;
    const formData = new FormData();
    formData.set("file", file);
    const result = await responseData<{ url: string }>(
      await fetch("/api/admin/catalog/upload", { method: "POST", body: formData }),
    );
    const imageInput = form.elements.namedItem("image");
    if (imageInput instanceof HTMLInputElement) {
      imageInput.value = result.url;
    }
    setMessage("Image uploaded.");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    setMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const toList = (key: string) => String(data.get(key) ?? "").split("\n").map((item) => item.trim()).filter(Boolean);
    const specifications = toList("specifications").map((line) => {
      const [label, ...rest] = line.split(":");
      return { label: label.trim(), value: rest.join(":").trim() };
    }).filter((item) => item.label && item.value);
    const body = {
      slug: data.get("slug"),
      title: data.get("title"),
      brand: data.get("brand"),
      category: data.get("category"),
      price: Number(data.get("price")),
      compare_at: Number(data.get("compare_at") || 0),
      rating: Number(data.get("rating") || 0),
      reviews: Number(data.get("reviews") || 0),
      image: data.get("image"),
      images: toList("images"),
      summary: data.get("summary"),
      tags: toList("tags"),
      features: toList("features"),
      specifications,
      inventory: Number(data.get("inventory") || 0),
      is_featured: data.has("is_featured"),
      is_new: data.has("is_new"),
      is_deal: data.has("is_deal"),
      is_uk_used: data.has("is_uk_used"),
      is_published: data.has("is_published"),
    };

    try {
      const response = await fetch(
        productId ? `/api/admin/catalog/products/${productId}` : "/api/admin/catalog/products",
        {
          method: productId ? "PATCH" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      await responseData(response);
      setMessage("Product saved.");
      if (!productId) form.reset();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save product.");
    } finally {
      setPending(false);
    }
  }

  if (loading) return <p className="rounded-2xl bg-white p-6 text-sm text-slate-500">Loading product…</p>;

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8">
      {error ? <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">{error}</p> : null}
      {message ? <p role="status" className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 sm:col-span-2">{message}</p> : null}
      <Field label="Product name" name="title" required defaultValue={value("title")} />
      <Field label="URL slug" name="slug" required defaultValue={value("slug")} />
      <Field label="Brand" name="brand" required defaultValue={value("brand")} />
      <Field label="Category" name="category" required defaultValue={value("category")} />
      <Field label="Price (₦)" name="price" type="number" min="0" step="0.01" required defaultValue={value("price", "0")} />
      <Field label="Compare-at price (₦)" name="compare_at" type="number" min="0" step="0.01" defaultValue={value("compare_at", "0")} />
      <Field label="Stock quantity" name="inventory" type="number" min="0" step="1" required defaultValue={value("inventory", "0")} />
      <Field label="Rating" name="rating" type="number" min="0" max="5" step="0.1" defaultValue={value("rating", "0")} />
      <Field label="Review count" name="reviews" type="number" min="0" step="1" defaultValue={value("reviews", "0")} />
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Product image URL
        <input name="image" defaultValue={value("image")} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Upload image (JPG, PNG, WebP, AVIF; max 5 MB)
        <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => {
          const file = event.currentTarget.files?.[0];
          const form = event.currentTarget.form;
          if (form) {
            void upload(file, form).catch((cause: unknown) => {
              setError(cause instanceof Error ? cause.message : "Image upload failed.");
            });
          }
        }} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm" />
      </label>
      <TextArea label="Description" name="summary" defaultValue={value("summary")} className="sm:col-span-2" />
      <TextArea label="Additional image URLs (one per line)" name="images" defaultValue={joinArray(product?.images)} />
      <TextArea label="Tags (one per line)" name="tags" defaultValue={joinArray(product?.tags)} />
      <TextArea label="Features (one per line)" name="features" defaultValue={joinArray(product?.features)} />
      <TextArea label="Specifications (one Label: Value per line)" name="specifications" defaultValue={joinSpecifications(product?.specifications)} />
      <div className="flex flex-wrap gap-x-6 gap-y-3 sm:col-span-2">
        <Check name="is_published" label="Published" checked={value("is_published", "true") !== "false"} />
        <Check name="is_featured" label="Featured" checked={value("is_featured") === "true"} />
        <Check name="is_new" label="New arrival" checked={value("is_new") === "true"} />
        <Check name="is_deal" label="Deal" checked={value("is_deal") === "true"} />
        <Check name="is_uk_used" label="UK used" checked={value("is_uk_used") === "true"} />
      </div>
      <button disabled={pending} className="rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60 sm:col-span-2">
        {pending ? "Saving…" : "Save product"}
      </button>
    </form>
  );
}

function joinArray(value: unknown) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function joinSpecifications(value: unknown) {
  return Array.isArray(value)
    ? value.map((item) => {
        if (!item || typeof item !== "object") return "";
        const entry = item as { label?: unknown; value?: unknown };
        return `${String(entry.label ?? "")}: ${String(entry.value ?? "")}`;
      }).join("\n")
    : "";
}

function Field(props: {
  label: string;
  name: string;
  type?: string;
  min?: string;
  max?: string;
  step?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  const { label, ...inputProps } = props;
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      {label}
      <input {...inputProps} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" />
    </label>
  );
}

function TextArea(props: { label: string; name: string; defaultValue: string; className?: string }) {
  return (
    <label className={`grid gap-2 text-sm font-medium text-slate-700 ${props.className ?? ""}`}>
      {props.label}
      <textarea name={props.name} defaultValue={props.defaultValue} rows={4} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" />
    </label>
  );
}

function Check(props: { name: string; label: string; checked: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-700">
      <input type="checkbox" name={props.name} defaultChecked={props.checked} className="h-4 w-4 accent-[#193B8C]" />
      {props.label}
    </label>
  );
}

export function AdminCatalogManager({ resource }: { resource: Resource }) {
  const [items, setItems] = useState<CatalogEntry[]>([]);
  const [editing, setEditing] = useState<CatalogEntry | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(true);
  const singular = resource === "brands" ? "Brand" : "Category";
  const collection = resource;

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await responseData<Record<Resource, CatalogEntry[]>>(
        await fetch(`/api/admin/catalog/${resource}`, { cache: "no-store" }),
      );
      setItems(result[collection]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : `Could not load ${resource}.`);
    } finally {
      setLoading(false);
    }
  }, [collection, resource]);

  useEffect(() => {
    let active = true;
    fetch(`/api/admin/catalog/${resource}`, { cache: "no-store" })
      .then((response) => responseData<Record<Resource, CatalogEntry[]>>(response))
      .then((result) => {
        if (active) setItems(result[collection]);
      })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : `Could not load ${resource}.`);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [collection, resource]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setPending(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    const body = {
      slug: String(data.get("slug") ?? ""),
      name: String(data.get("name") ?? ""),
      title: String(data.get("name") ?? ""),
      description: String(data.get("description") ?? ""),
      logo: String(data.get("image") ?? ""),
      image: String(data.get("image") ?? ""),
      is_active: data.has("is_active"),
    };

    try {
      const endpoint = `/api/admin/catalog/${resource}${editing ? `/${encodeURIComponent(editing.slug)}` : ""}`;
      await responseData(await fetch(endpoint, {
        method: editing ? "PATCH" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      }));
      setMessage(`${singular} saved.`);
      setEditing(null);
      form.reset();
      await refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : `Could not save ${singular.toLowerCase()}.`);
    } finally {
      setPending(false);
    }
  }

  async function remove(item: CatalogEntry) {
    if (!window.confirm(`Delete ${item.name ?? item.title}?`)) return;
    setError("");
    try {
      await responseData(await fetch(`/api/admin/catalog/${resource}/${encodeURIComponent(item.slug)}`, { method: "DELETE" }));
      setMessage(`${singular} deleted.`);
      await refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : `Could not delete ${singular.toLowerCase()}.`);
    }
  }

  async function upload(file: File | undefined, form: HTMLFormElement) {
    if (!file) return;
    const formData = new FormData();
    formData.set("file", file);
    const result = await responseData<{ url: string }>(
      await fetch("/api/admin/catalog/upload", { method: "POST", body: formData }),
    );
    const imageInput = form.elements.namedItem("image");
    if (imageInput instanceof HTMLInputElement) imageInput.value = result.url;
    setMessage("Image uploaded.");
  }

  const currentName = editing?.name ?? editing?.title ?? "";
  const currentImage = editing?.logo ?? editing?.image ?? "";

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <form key={editing?.slug ?? "new"} onSubmit={submit} className="grid content-start gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">{editing ? `Edit ${singular.toLowerCase()}` : `Add ${singular.toLowerCase()}`}</h2>
        {error ? <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        {message ? <p role="status" className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p> : null}
        <Field label="Name" name="name" required defaultValue={currentName} />
        <Field label="URL slug" name="slug" required defaultValue={editing?.slug ?? ""} />
        <TextArea label="Description" name="description" defaultValue={editing?.description ?? ""} />
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Image URL
          <input name="image" defaultValue={currentImage} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Upload image (JPG, PNG, WebP, AVIF; max 5 MB)
          <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              const form = event.currentTarget.form;
              if (form) {
                void upload(file, form).catch((cause: unknown) => {
                  setError(cause instanceof Error ? cause.message : "Image upload failed.");
                });
              }
            }} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm" />
        </label>
        <Check name="is_active" label="Visible in storefront" checked={editing?.is_active ?? true} />
        <div className="flex gap-2">
          <button disabled={pending} className="rounded-full bg-[#193B8C] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">{pending ? "Saving…" : "Save"}</button>
          {editing ? <button type="button" onClick={() => setEditing(null)} className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700">Cancel</button> : null}
        </div>
      </form>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Current {resource}</h2>
        {loading ? <p className="text-sm text-slate-500">Loading…</p> : null}
        {!loading && items.length === 0 ? <p className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">No {resource} yet. Import the starter catalog from Products or add one here.</p> : null}
        <div className="grid gap-3">
          {items.map((item) => (
            <article key={item.slug} className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-100 p-4">
              {(item.logo ?? item.image) ? <img src={item.logo ?? item.image} alt="" className="h-12 w-12 rounded-xl bg-slate-100 object-contain p-1" /> : null}
              <div className="min-w-36 flex-1">
                <h3 className="font-semibold text-slate-900">{item.name ?? item.title}</h3>
                <p className="text-xs text-slate-500">{item.slug} · {item.is_active ? "Visible" : "Hidden"}</p>
              </div>
              <button type="button" onClick={() => { setEditing(item); setError(""); setMessage(""); }} className="rounded-full border border-slate-300 px-4 py-2 text-sm">Edit</button>
              <button type="button" onClick={() => void remove(item)} className="rounded-full border border-red-200 px-4 py-2 text-sm text-red-700">Delete</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export function AdminInventory() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    void fetch("/api/admin/catalog/products", { cache: "no-store" })
      .then((response) => responseData<{ products: CatalogProduct[] }>(response))
      .then(({ products: values }) => setProducts(values))
      .catch((cause: unknown) => setError(cause instanceof Error ? cause.message : "Could not load inventory."));
  }, []);

  async function changeStock(id: number, inventory: number) {
    const current = products.find((item) => item.id === id);
    if (!current) return;
    setError("");
    setMessage("");
    try {
      const response = await fetch(`/api/admin/catalog/products/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ inventory }),
      });
      await responseData(response);
      setProducts((items) => items.map((item) => item.id === id ? { ...item, inventory } : item));
      setMessage("Stock updated.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not update stock.");
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-slate-900">Inventory controls</h2>
      {error ? <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      {message ? <p role="status" className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p> : null}
      <div className="grid gap-3">
        {products.map((product) => (
          <div key={product.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-100 p-4">
            <div className="min-w-48 flex-1"><p className="font-medium text-slate-900">{product.title}</p><p className="text-xs text-slate-500">{product.brand} · {product.category}</p></div>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              Units in stock
              <input type="number" min="0" defaultValue={product.inventory} id={`stock-${product.id}`} className="w-24 rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <button type="button" onClick={() => {
              const input = document.getElementById(`stock-${product.id}`);
              if (input instanceof HTMLInputElement) void changeStock(product.id, Number(input.value));
            }} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium">Save stock</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AdminContent() {
  const [content, setContent] = useState({ announcement: "", hero_title: "", hero_description: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    void fetch("/api/admin/catalog/content", { cache: "no-store" })
      .then((response) => responseData<{ content: typeof content }>(response))
      .then((result) => setContent(result.content))
      .catch((cause: unknown) => setError(cause instanceof Error ? cause.message : "Could not load content."));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    setMessage("");
    const data = new FormData(event.currentTarget);
    try {
      await responseData(await fetch("/api/admin/catalog/content", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          announcement: data.get("announcement"),
          hero_title: data.get("hero_title"),
          hero_description: data.get("hero_description"),
        }),
      }));
      setMessage("Storefront content saved.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save content.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {error ? <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      {message ? <p role="status" className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p> : null}
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Announcement bar
        <input name="announcement" value={content.announcement} onChange={(event) => setContent({ ...content, announcement: event.target.value })} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Homepage headline
        <input name="hero_title" required value={content.hero_title} onChange={(event) => setContent({ ...content, hero_title: event.target.value })} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Homepage description
        <textarea name="hero_description" required rows={4} value={content.hero_description} onChange={(event) => setContent({ ...content, hero_description: event.target.value })} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" />
      </label>
      <button disabled={pending} className="w-fit rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">{pending ? "Saving…" : "Save content"}</button>
    </form>
  );
}
