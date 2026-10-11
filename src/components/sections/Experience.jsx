import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { experience } from '../../data/experience'
import { SectionLabel } from '../ui/SectionLabel'

export function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.7', 'end 0.3'],
  })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" ref={ref} className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionLabel index="04" title="Experience" />
        <h2 className="text-3xl md:text-4xl font-medium mb-16">Where I&apos;ve shipped AI features.</h2>

        <div className="relative pl-8 max-w-2xl">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10">
            <motion.div
              className="w-full bg-[var(--color-accent)] origin-top"
              style={{ height }}
            />
          </div>

          <div className="space-y-16">
            {experience.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                className="relative"
              >
                <span className="absolute -left-[26px] top-2 h-3 w-3 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-surface)]" />
                <article
                  className={`rounded-3xl border p-6 md:p-8 ${
                    job.highlight
                      ? 'border-[var(--color-accent)]/40 bg-[var(--color-accent-muted)]'
                      : 'border-white/10 bg-white/[0.02]'
                  }`}
                >
                  {job.highlight ? (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                      Featured internship
                    </span>
                  ) : null}
                  <h3 className="text-xl font-medium mt-1">{job.role}</h3>
                  <p className="text-[var(--color-accent)] mt-1">{job.company}</p>
                  <p className="font-mono text-xs text-[var(--color-text-muted)] mt-2">{job.period}</p>
                  <ul className="mt-6 space-y-3 text-sm text-[var(--color-text-muted)] list-disc pl-5">
                    {job.bullets.map((b) => (
                      <li key={b.slice(0, 40)}>{b}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {job.technologies.map((t) => (
                      <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-black/20 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
