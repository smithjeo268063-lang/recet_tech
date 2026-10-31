import { InfoPage } from "@/components/storefront";
import { getCatalogProducts } from "@/lib/catalog-data";

export default async function ComparePage() {
  const products = await getCatalogProducts();
  const selected = products.slice(0, 3);
  return (
    <InfoPage title="Compare devices" description="Compare specs, price and value across your shortlist before you purchase.">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-100 text-xs uppercase tracking-[0.2em] text-slate-500">
            <tr>
              <th className="px-6 py-4">Model</th>
              {selected.map((item) => (<th key={item.id} className="px-6 py-4">{item.title}</th>))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-200">
              <td className="px-6 py-4 font-medium text-slate-900">Price</td>
              {selected.map((item) => (<td key={item.id} className="px-6 py-4">₦{item.price.toLocaleString()}</td>))}
            </tr>
            <tr className="border-t border-slate-200">
              <td className="px-6 py-4 font-medium text-slate-900">Rating</td>
              {selected.map((item) => (<td key={item.id} className="px-6 py-4">{item.rating}/5</td>))}
            </tr>
            <tr className="border-t border-slate-200">
              <td className="px-6 py-4 font-medium text-slate-900">Features</td>
              {selected.map((item) => (<td key={item.id} className="px-6 py-4">{item.features[0]}</td>))}
            </tr>
          </tbody>
        </table>
      </div>
    </InfoPage>
  );
}
