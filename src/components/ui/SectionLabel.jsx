export function SectionLabel({ index, title }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest">
        {index}
      </span>
      <span className="h-px w-8 bg-[var(--color-accent)]/40" />
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
        {title}
      </span>
    </div>
  )
}
