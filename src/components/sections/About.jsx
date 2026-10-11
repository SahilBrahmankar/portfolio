import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import { SectionLabel } from '../ui/SectionLabel'

const meta = [
  { key: 'Role', value: profile.meta.role },
  { key: 'Focus', value: profile.meta.focus },
  { key: 'Location', value: profile.meta.location },
  { key: 'Status', value: profile.meta.status },
]

export function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-[100svh] items-center py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <SectionLabel index="01" title="Who am I" />

        <motion.h2
          data-gsap-reveal
          className="max-w-4xl text-4xl font-medium leading-[1.12] tracking-tight md:text-6xl lg:text-7xl"
        >
          I build LLM systems that{' '}
          <span className="text-[var(--color-accent)]">cite</span>,{' '}
          <span className="text-[var(--color-accent)]">extract</span>, and{' '}
          <span className="text-[var(--color-accent)]">query</span>.
        </motion.h2>

        <p className="mt-6 max-w-xl text-[var(--color-text-muted)] md:text-lg">
          AI Engineering Intern · Python &amp; SQL · RAG, structured APIs, agents.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-white/10 pt-8 md:grid-cols-4">
          {meta.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                {item.key}
              </p>
              <p className="mt-2 text-base font-medium md:text-lg">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
