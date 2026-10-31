import { BrandGrid } from "@/components/brand-grid";
import { InfoPage } from "@/components/storefront";
import { getCatalogBrands, getCatalogProducts } from "@/lib/catalog-data";

export default async function BrandsPage() {
  const [brands, products] = await Promise.all([getCatalogBrands(), getCatalogProducts()]);
  return (
    <InfoPage title="Browse by brand" description="Choose from trusted names across smartphones, laptops, audio and accessories.">
      <BrandGrid brands={brands} products={products} />
    </InfoPage>
  );
}
