import { notFound } from "next/navigation";
import { ProductActions } from "@/components/product-actions";
import { ProductGallery } from "@/components/product-gallery";
import { SectionHeading } from "@/components/storefront";
import { ProductCard } from "@/components/product-card";
import { getCatalogProducts } from "@/lib/catalog-data";
import Link from "next/link";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getCatalogProducts();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const gallery = product.images.length > 0 ? product.images : [];

  return (
    <main className="mx-auto max-w-7xl px-3.5 py-16 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {gallery.length > 0 ? (
          <ProductGallery title={product.title} images={gallery} />
        ) : (
          <div className="flex min-h-72 items-center justify-center rounded-3xl border border-slate-200 bg-slate-100 p-8 text-center text-sm text-slate-500 lg:min-h-[520px]">
            Product image coming soon
          </div>
        )}

        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-[#193B8C]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#193B8C]">{product.brand}</span>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">{product.title}</h1>
          {product.reviews > 0 ? (
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="text-amber-500">★★★★★</span>
              <span>{product.rating} ({product.reviews} reviews)</span>
            </div>
          ) : null}
          {product.price > 0 ? (
            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold text-[#193B8C]">₦{product.price.toLocaleString()}</span>
              {product.compareAt > product.price ? (
                <span className="text-lg text-slate-400 line-through">₦{product.compareAt.toLocaleString()}</span>
              ) : null}
            </div>
          ) : (
            <div className="rounded-2xl bg-blue-50 p-4">
              <p className="font-semibold text-[#193B8C]">Contact us for current price and availability</p>
              <Link
                href={`mailto:support@recettech.ng?subject=${encodeURIComponent(`Price and availability: ${product.title}`)}`}
                className="mt-3 inline-flex rounded-full bg-[#193B8C] px-5 py-3 text-sm font-semibold text-white"
              >
                Ask about this product
              </Link>
            </div>
          )}
          <p className="text-base leading-8 text-slate-600">{product.summary}</p>
          {product.price > 0 ? (
            <ProductActions productId={product.id} productSlug={product.slug} productTitle={product.title} />
          ) : null}
          {product.features.length > 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-medium text-slate-700">Key features</div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {product.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[#193B8C]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      {product.specifications.length > 0 ? (
        <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeading eyebrow="Specifications" title="Full device specs" />
          <dl className="grid gap-4 sm:grid-cols-2">
            {product.specifications.map((spec) => (
              <div key={spec.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{spec.label}</dt>
                <dd className="mt-2 text-sm font-medium text-slate-800">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      <div className="mt-16">
        <SectionHeading eyebrow="Similar products" title="More popular picks" />
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 xl:gap-8">
          {products.filter((item) => item.category === product.category && item.brand === product.brand && item.id !== product.id).slice(0, 3).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
