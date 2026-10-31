import { CategoryGrid } from "@/components/category-grid";
import { InfoPage } from "@/components/storefront";
import { getCatalogCategories } from "@/lib/catalog-data";

export default async function CategoriesPage() {
  const categories = await getCatalogCategories();
  return (
    <InfoPage title="Explore our categories" description="Browse the full range of technology products designed for everyday modern life.">
      <CategoryGrid categories={categories} />
    </InfoPage>
  );
}
