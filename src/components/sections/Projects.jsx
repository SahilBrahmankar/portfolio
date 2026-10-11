import { motion } from 'framer-motion'
import { useState } from 'react'
import { projects } from '../../data/projects'
import { ProjectModal } from '../projects/ProjectModal'
import { ProjectVisual } from '../projects/ProjectVisual'
import { SectionLabel } from '../ui/SectionLabel'

export function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionLabel index="03" title="Projects" />
        <div className="mb-12">
          <h2 data-gsap-reveal className="max-w-2xl text-3xl font-medium md:text-5xl">
            Built, tested, measured.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <button
                type="button"
                onClick={() => setSelected(project)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-black/40 text-left transition duration-300 hover:-translate-y-1 hover:border-white/25"
                style={{ boxShadow: `0 0 0 0 ${project.accent}` }}
                data-cursor="project"
                data-cursor-label="VIEW"
              >
                <div className="relative h-44 overflow-hidden border-b border-white/10 sm:h-48">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background: `radial-gradient(circle at 70% 20%, ${project.accent}66, transparent 55%)`,
                    }}
                  />
                  <ProjectVisual type={project.type} accent={project.accent} />
                  <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.25em] text-white/50">
                    {project.number}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: project.accent }}>
                    {project.year} · {project.metric}
                  </p>
                  <h3 className="mt-2 text-lg font-medium leading-snug group-hover:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm text-[var(--color-text-muted)]">
                    {project.shortDescription}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[10px] text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p
                    className="mt-auto pt-5 font-mono text-[11px] tracking-widest"
                    style={{ color: project.accent }}
                  >
                    Open case study →
                  </p>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
