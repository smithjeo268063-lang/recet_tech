import { InfoPage } from "@/components/storefront";
import { AdminNav } from "../admin-nav";
import { AdminCatalogManager } from "../catalog-admin";

export default function AdminBrandsPage() {
  return (
    <InfoPage title="Brands" description="Add, archive and maintain brand pages and storefront associations.">
      <AdminNav />
      <AdminCatalogManager resource="brands" />
    </InfoPage>
  );
}