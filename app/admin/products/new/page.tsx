import { InfoPage } from "@/components/storefront";
import { AdminNav } from "../../admin-nav";
import { AdminProductForm } from "../../catalog-admin";

export default function NewProductPage() {
  return (
    <InfoPage title="Add new product" description="Create a product with inventory, media and pricing metadata.">
      <AdminNav />
      <AdminProductForm />
    </InfoPage>
  );
}