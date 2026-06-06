export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="max-w-md space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
          Access denied
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          You do not have permission to view this page.
        </h1>
        <p className="text-sm leading-6 text-slate-600">
          Contact HR if you think this restriction is incorrect for your role.
        </p>
      </section>
    </main>
  );
}
