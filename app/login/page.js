import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { PageLoader } from "@/components/shared/PageLoader";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <div className="container-w flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <Suspense fallback={<PageLoader />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
