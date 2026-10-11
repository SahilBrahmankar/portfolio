import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { thinkingSteps } from '../../data/thinkingFlow'
import { SectionLabel } from '../ui/SectionLabel'

export function HowIThink() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="thinking" ref={ref} className="py-24 md:py-32 bg-[var(--color-surface-elevated)]/40 border-y border-white/5">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionLabel index="02" title="How I think" />
        <h2 className="text-3xl md:text-4xl font-medium max-w-2xl mb-16">
          From problem framing to measured impact — the loop behind my AI projects.
        </h2>

        <div className="relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-white/10 origin-left">
            <motion.div
              className="h-full bg-[var(--color-accent)] origin-left"
              style={{ scaleX: lineScale }}
            />
          </div>

          <ol className="grid md:grid-cols-6 gap-8 md:gap-4">
            {thinkingSteps.map((step, i) => (
              <motion.li
                key={step.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ delay: i * 0.06 }}
                className="relative"
              >
                <div className="flex md:flex-col items-start md:items-stretch gap-4">
                  <div className="flex items-center gap-3 md:flex-col md:items-start">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-surface)] font-mono text-xs text-[var(--color-accent)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-medium text-lg">{step.label}</h3>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed md:mt-2 pl-[52px] md:pl-0">
                    {step.description}
                  </p>
                </div>
                {i < thinkingSteps.length - 1 ? (
                  <span className="md:hidden block ml-5 mt-4 mb-2 text-[var(--color-accent)]/50">↓</span>
                ) : null}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
