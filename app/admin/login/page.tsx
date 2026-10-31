import { InfoPage } from "@/components/storefront";
import { AdminLoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <InfoPage title="Admin login" description="Sign in to manage the RecetTech catalog and storefront content.">
      <AdminLoginForm />
    </InfoPage>
  );
}