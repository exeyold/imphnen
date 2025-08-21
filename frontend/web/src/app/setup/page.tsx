import { Metadata } from "next";
import { SetupForm } from "~/features/setup/forms/setup-form";

export const metadata: Metadata = {
  title: "Setup",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <SetupForm />
      </div>
    </main>
  );
}
