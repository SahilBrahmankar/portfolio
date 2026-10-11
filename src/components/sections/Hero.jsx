import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import { SkillGlobe } from '../animations/SkillGlobe'
import { MagneticButton } from '../ui/MagneticButton'
import { scrollToSection } from '../../utils/scrollTo'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="font-mono text-xs text-[var(--color-accent)] tracking-[0.25em] uppercase mb-4"
          >
            {profile.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight"
          >
            {profile.firstName}
            <br />
            <span className="text-gradient">{profile.lastName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-[var(--color-text-muted)] max-w-xl leading-relaxed"
          >
            {profile.title} — {profile.summary.split('.')[0]}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-10 flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1"
          >
            <MagneticButton
              type="button"
              onClick={() => scrollToSection('projects')}
              className="shrink-0 px-4 sm:px-5 py-2.5 rounded-full bg-[var(--color-accent)] text-black font-medium text-sm hover:brightness-110 transition"
              data-cursor="button"
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              as="a"
              href={profile.resumePath}
              download
              className="shrink-0 px-4 sm:px-5 py-2.5 rounded-full border border-white/15 text-sm font-medium hover:border-[var(--color-accent)]/50 transition"
              data-cursor="button"
            >
              Download Resume
            </MagneticButton>
            <MagneticButton
              as="a"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-4 sm:px-5 py-2.5 rounded-full border border-white/15 text-sm font-medium hover:border-[var(--color-accent)]/50 transition"
              data-cursor="link"
              data-cursor-label="GIT"
            >
              GitHub
            </MagneticButton>
            <MagneticButton
              as="a"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-4 sm:px-5 py-2.5 rounded-full border border-white/15 text-sm font-medium hover:border-[var(--color-accent)]/50 transition"
              data-cursor="link"
              data-cursor-label="IN"
            >
              LinkedIn
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="relative h-[320px] sm:h-[420px] lg:h-[520px] overflow-hidden rounded-3xl border border-white/10 bg-black"
        >
          <SkillGlobe />
        </motion.div>
      </div>
    </section>
  )
}
