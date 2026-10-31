import { InfoPage } from "@/components/storefront";
import { AdminNav } from "../admin-nav";
import { AdminProducts } from "../catalog-admin";

export default function AdminProductsPage() {
  return (
    <InfoPage title="Products management" description="Create, edit and organize the storefront catalog and product metadata.">
      <AdminNav />
      <AdminProducts />
    </InfoPage>
  );
}