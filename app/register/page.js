import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { PageLoader } from "@/components/shared/PageLoader";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <div className="container-w flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <Suspense fallback={<PageLoader />}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
