type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="space-y-2">
      <h1 className="text-3xl font-semibold tracking-tight text-[--color-fg]">
        {title}
      </h1>
      {description ? (
        <p className="max-w-3xl text-sm text-stone-600">{description}</p>
      ) : null}
    </header>
  );
}
