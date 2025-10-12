type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section({ id, eyebrow, title, subtitle, children, className }: Props) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-4 py-14 md:py-20 ${className ?? ''}`}>
      {(eyebrow || title || subtitle) && (
        <header className="mb-8 md:mb-12">
          {eyebrow && <p className="text-sm font-semibold tracking-widest uppercase opacity-70">{eyebrow}</p>}
          {title && <h2 className="mt-2 text-2xl md:text-4xl font-bold">{title}</h2>}
          {subtitle && <p className="mt-3 text-lg opacity-80">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
