import type { ReactNode } from "react";

type AppShellProps = {
  roleLabel: string;
  children: ReactNode;
};

export function AppShell({ roleLabel, children }: AppShellProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between rounded-3xl border border-[--color-border] bg-[--color-panel] px-5 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            HR Management System
          </p>
          <p className="mt-1 text-sm text-stone-600">
            Role-scoped workspace for internal people operations.
          </p>
        </div>
        <span className="rounded-full border border-[--color-border] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[--color-accent-strong]">
          {roleLabel}
        </span>
      </div>

      {children}
    </main>
  );
}
