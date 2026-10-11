import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close project details"
          />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl glass p-6 md:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 font-mono text-xs text-[var(--color-text-muted)] hover:text-white"
              data-cursor="button"
            >
              ESC
            </button>
            <p className="font-mono text-[var(--color-accent)] text-xs">{project.number}</p>
            <h3 id="project-title" className="text-2xl md:text-3xl font-medium mt-2">
              {project.title}
            </h3>
            <p className="text-[var(--color-text-muted)] mt-4">{project.shortDescription}</p>

            <div className="mt-8 space-y-6 text-sm">
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                  Problem
                </h4>
                <p className="mt-2">{project.problem}</p>
              </div>
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                  My contribution
                </h4>
                <p className="mt-2">{project.contribution}</p>
              </div>
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                  Key features
                </h4>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-[var(--color-text-muted)]">
                  {project.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                  Stack
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((t) => (
                    <span key={t} className="px-2 py-1 rounded-md bg-white/5 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {(project.github || project.demo) && (
              <div className="mt-8 flex gap-4">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-accent)]"
                    data-cursor="link"
                  >
                    GitHub →
                  </a>
                ) : null}
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-accent)]"
                    data-cursor="link"
                  >
                    Live demo →
                  </a>
                ) : null}
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
