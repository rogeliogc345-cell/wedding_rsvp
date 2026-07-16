import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <AdminLoginForm />
      </div>
    </div>
  );
}
