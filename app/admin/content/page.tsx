import { InfoPage } from "@/components/storefront";
import { AdminNav } from "../admin-nav";
import { AdminContent } from "../catalog-admin";

export default function AdminContentPage() {
  return (
    <InfoPage title="Content" description="Manage homepage sections, announcements and prominent storefront messaging.">
      <AdminNav />
      <AdminContent />
    </InfoPage>
  );
}