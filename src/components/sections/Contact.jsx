import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import { MagneticButton } from '../ui/MagneticButton'
import { SectionLabel } from '../ui/SectionLabel'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { MdEmail, MdLocationOn } from 'react-icons/md'

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
          animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-8 relative z-10">
        <SectionLabel index="06" title="Contact" />
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight max-w-3xl">
          Let&apos;s build something{' '}
          <span className="text-[var(--color-accent)]">intelligent</span>.
        </h2>
        <p className="mt-6 text-[var(--color-text-muted)] text-lg max-w-xl">
          Open to entry-level AI Engineer roles. Reach out for collaborations, internships, or technical conversations.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row flex-wrap gap-4">
          <MagneticButton
            as="a"
            href={`mailto:${profile.email}`}
            className="px-8 py-4 rounded-full bg-[var(--color-accent)] text-black font-medium flex items-center gap-2"
            data-cursor="button"
          >
            <MdEmail className="h-5 w-5" />
            {profile.email}
          </MagneticButton>
          <MagneticButton
            as="a"
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full border border-white/15 font-medium"
            data-cursor="button"
          >
            Download Resume
          </MagneticButton>
        </div>

        <ul className="mt-12 flex flex-wrap gap-8 font-mono text-sm text-[var(--color-text-muted)]">
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[var(--color-accent)]" data-cursor="link">
              <FaLinkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[var(--color-accent)]" data-cursor="link">
              <SiGithub className="h-4 w-4" />
              GitHub
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-[var(--color-accent)]" data-cursor="link">
              <MdEmail className="h-4 w-4" />
              {profile.email}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <MdLocationOn className="h-4 w-4" />
            {profile.location}
          </li>
        </ul>
      </div>
    </section>
  )
}
