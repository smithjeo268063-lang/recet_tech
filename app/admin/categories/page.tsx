import { InfoPage } from "@/components/storefront";
import { AdminNav } from "../admin-nav";
import { AdminCatalogManager } from "../catalog-admin";

export default function AdminCategoriesPage() {
  return (
    <InfoPage title="Categories" description="Manage product categories and taxonomy for storefront browsing.">
      <AdminNav />
      <AdminCatalogManager resource="categories" />
    </InfoPage>
  );
}