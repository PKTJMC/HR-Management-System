type StatCardProps = {
  label: string;
  value: string;
  description?: string;
};

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <article className="rounded-3xl border border-[--color-border] bg-[--color-panel] p-5 shadow-sm">
      <p className="text-sm font-medium text-stone-600">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-[--color-fg]">
        {value}
      </p>
      {description ? (
        <p className="mt-2 text-sm text-stone-600">{description}</p>
      ) : null}
    </article>
  );
}
