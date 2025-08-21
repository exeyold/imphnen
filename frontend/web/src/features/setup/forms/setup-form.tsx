"use client";

import { useState } from "react";
import { useGetSession } from "~/features/auth/hooks/use-get-session";

export function SetupForm() {
  const [step, setStep] = useState(0);
  const totalSteps = 4;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Story-style step indicator at the very top */}
      <StepIndicator step={step} totalSteps={totalSteps} />

      {/* Step Content */}
      <div className="flex flex-1 items-center justify-center px-6">
        <form className="w-full max-w-lg space-y-8">
          <StepForm step={step} />

          <StepNavigation
            step={step}
            totalSteps={totalSteps}
            setStep={setStep}
          />
        </form>
      </div>
    </div>
  );
}

function StepIndicator({
  step,
  totalSteps,
}: {
  step: number;
  totalSteps: number;
}) {
  return (
    <div className="flex w-full gap-2 px-6 pt-4">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${
            i <= step ? "bg-primary" : "bg-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

function StepForm({ step }: { step: number }) {
  const { data: session } = useGetSession();

  if (step === 0) {
    return (
      <div className="flex flex-col gap-y-5">
        <h1 className="text-3xl font-bold text-center mb-2">Portfolio Setup</h1>

        {/* Display Name */}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="name" className="text-lg font-medium">
            Display Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={session?.name ?? ""}
            placeholder="e.g., Alex Johnson"
            className="w-full rounded-xl border bg-input px-5 py-3 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>

        {/* Username */}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="username" className="text-lg font-medium">
            Username
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground text-lg">
              @
            </span>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={session?.username ?? ""}
              placeholder="your-username"
              className="w-full rounded-xl border bg-input pl-10 pr-4 py-3 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <p className="text-center text-base text-muted-foreground">
        Step 2 content goes here…
      </p>
    );
  }

  if (step === 2) {
    return (
      <p className="text-center text-base text-muted-foreground">
        Step 3 content goes here…
      </p>
    );
  }

  if (step === 3) {
    return (
      <p className="text-center text-base text-muted-foreground">
        Final step content goes here…
      </p>
    );
  }

  return null;
}

function StepNavigation({
  step,
  totalSteps,
  setStep,
}: {
  step: number;
  totalSteps: number;
  setStep: (s: number) => void;
}) {
  return (
    <div className="flex justify-between pt-6">
      <button
        type="button"
        onClick={() => setStep(Math.max(0, step - 1))}
        disabled={step === 0}
        className="rounded-xl border bg-muted px-6 py-3 text-base font-medium text-foreground disabled:opacity-50"
      >
        Back
      </button>

      {step < totalSteps - 1 ? (
        <button
          type="button"
          onClick={() => setStep(Math.min(totalSteps - 1, step + 1))}
          className="rounded-xl border bg-primary text-primary-foreground px-6 py-3 text-base font-medium hover:bg-primary/90"
        >
          Next
        </button>
      ) : (
        <button
          type="submit"
          className="rounded-xl border bg-primary text-primary-foreground px-6 py-3 text-base font-medium hover:bg-primary/90"
        >
          Save
        </button>
      )}
    </div>
  );
}
