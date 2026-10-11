import { motion } from 'framer-motion'
import { skillCategories } from '../../data/skills'
import { SectionLabel } from '../ui/SectionLabel'
import { SkillMark } from '../ui/SkillMark'

const BASICS = new Set(['Hugging Face Transformers', 'Docker', 'MCP'])

export function SkillConstellation() {
  return (
    <section id="skills" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionLabel index="02" title="Skills" />
        <h2 className="text-3xl font-medium md:text-5xl">
          Skills &amp; stack
          <span className="text-[var(--color-accent)]">.</span>
        </h2>

        <div className="mt-14 space-y-10">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <h3 className="mb-4 text-lg font-medium">{cat.label}</h3>
              <ul className="flex flex-wrap gap-3">
                {cat.skills.map((skill) => (
                  <li key={skill}>
                    <span
                      className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white/90 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)]/50 hover:bg-white/[0.08] hover:shadow-[0_0_24px_rgba(34,211,238,0.15)]"
                      data-cursor="link"
                    >
                      <SkillMark name={skill} color={cat.color} />
                      {skill}
                      {BASICS.has(skill) ? (
                        <span className="font-mono text-[10px] text-white/40">basics</span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
