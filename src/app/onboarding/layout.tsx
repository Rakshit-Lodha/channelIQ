import { AuthSync } from "@/components/AuthSync";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthSync />
      {children}
    </>
  );
}
