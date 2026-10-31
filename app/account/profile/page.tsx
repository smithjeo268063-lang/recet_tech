import { InfoPage } from "@/components/storefront";

export default function ProfilePage() {
  return (
    <InfoPage title="Profile" description="Edit your profile details and account preferences.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"> 
        <form className="grid gap-4 md:grid-cols-2">
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="First name" />
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Last name" />
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:col-span-2" placeholder="Phone number" />
          <button className="rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white md:col-span-2">Save profile</button>
        </form>
      </div>
    </InfoPage>
  );
}