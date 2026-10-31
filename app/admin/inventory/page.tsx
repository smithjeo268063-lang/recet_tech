import { InfoPage } from "@/components/storefront";
import { AdminNav } from "../admin-nav";
import { AdminInventory } from "../catalog-admin";

export default function AdminInventoryPage() {
  return (
    <InfoPage title="Inventory" description="Monitor stock, low inventory alerts and replenishment across all product lines.">
      <AdminNav />
      <AdminInventory />
    </InfoPage>
  );
}