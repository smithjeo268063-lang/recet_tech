import { InfoPage } from "@/components/storefront";

export default function AdminReviewsPage() {
  return (
    <InfoPage title="Reviews" description="Moderate product reviews, ratings and customer feedback.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><p className="text-sm leading-7 text-slate-600">This route supports review approval, moderation and rating summary updates.</p></div>
    </InfoPage>
  );
}