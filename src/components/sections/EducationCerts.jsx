import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { certifications } from '../../data/certifications'
import { education } from '../../data/education'
import { SectionLabel } from '../ui/SectionLabel'

const glyphs = {
  'nptel-python': (
    <path d="M8 4h8v4H8zm0 6h4v10H8zm6 0h4v6h-4z" fill="currentColor" />
  ),
  gcp: (
    <path
      d="M12 3l7 4v6c0 4-3 7-7 8-4-1-7-4-7-8V7l7-4zm0 5a4 4 0 100 8 4 4 0 000-8z"
      fill="currentColor"
    />
  ),
  mern: (
    <path
      d="M4 7l8-4 8 4v10l-8 4-8-4V7zm8 2.2L8 7.2v9.6l4 2 4-2V7.2L12 9.2z"
      fill="currentColor"
    />
  ),
  sih: (
    <path d="M6 19V9l6-5 6 5v10H6zm3-3h6v2H9v-2z" fill="currentColor" />
  ),
}

export function EducationCerts() {
  const [active, setActive] = useState(certifications[0]?.id ?? null)
  const current = certifications.find((c) => c.id === active) ?? certifications[0]
  const edu = education[0]

  return (
    <section id="education" className="relative overflow-hidden border-t border-white/5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionLabel index="05" title="Education & credentials" />

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col gap-6 min-h-[360px]">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[var(--color-accent)]/5 to-black/40 p-6 md:p-8 flex-1"
              data-cursor="link"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
              <div className="relative z-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                  Education
                </p>
                <h3 className="mt-4 text-xl font-medium md:text-2xl">{edu.degree}</h3>
                <p className="mt-2 text-[var(--color-text-muted)]">{edu.institution}</p>
                <p className="mt-3 font-mono text-xs text-white/50">{edu.period}</p>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[var(--color-accent)]/5 to-black/40 p-6 md:p-8 flex-1"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
              <div className="relative z-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                  Achievements
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    <span className="text-[var(--color-text-muted)]">
                      First Prize – Internship Project Competition, MVP's KBTCOE (April 2025)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    <span className="text-[var(--color-text-muted)]">
                      First Prize – Google Cloud Quiz Competition, College Technical Fest (August 2023)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    <span className="text-[var(--color-text-muted)]">
                      Hackathon – Selected in the college-level screening for Smart India Hackathon (SIH) (September 2025)
                    </span>
                  </li>
                </ul>
              </div>
            </motion.article>
          </div>

          <div className="flex min-h-[360px] flex-col rounded-[28px] border border-white/10 bg-black/30 p-3 md:p-4">
            <p className="px-3 pt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
              Select a credential
            </p>
            <div className="mt-3 space-y-2">
              {certifications.map((cert, i) => {
                const isOn = cert.id === current?.id
                return (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => setActive(cert.id)}
                    onMouseEnter={() => setActive(cert.id)}
                    onFocus={() => setActive(cert.id)}
                    className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left transition ${
                      isOn
                        ? 'border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10'
                        : 'border-transparent bg-transparent hover:bg-white/5'
                    }`}
                    data-cursor="button"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                        isOn
                          ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                          : 'border-white/10 text-white/50'
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                        {glyphs[cert.id] ?? glyphs['nptel-python']}
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{cert.title}</span>
                      <span className="block truncate font-mono text-[10px] text-white/40">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              {current ? (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-auto rounded-2xl border border-white/10 bg-black/50 p-5"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    {current.year ?? 'Credential'}
                  </p>
                  <h3 className="mt-2 text-xl font-medium">{current.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">{current.issuer}</p>
                  {current.note ? (
                    <p className="mt-4 rounded-xl border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 px-3 py-2 font-mono text-xs text-[var(--color-accent)]">
                      {current.note}
                    </p>
                  ) : null}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
