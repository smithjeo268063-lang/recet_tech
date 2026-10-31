import { InfoPage } from "@/components/storefront";
import { AdminNav } from "../../../admin-nav";
import { AdminProductForm } from "../../../catalog-admin";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <InfoPage title="Edit product" description="Update product data, pricing and metadata for a live offer.">
      <AdminNav />
      <AdminProductForm productId={id} />
    </InfoPage>
  );
}