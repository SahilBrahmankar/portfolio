import { profile } from '../../data/profile'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto max-w-6xl px-4 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sm text-[var(--color-text-muted)]">
        <div>
          <p className="text-white font-medium">{profile.name}</p>
          <p className="font-mono text-xs mt-1">{profile.title}</p>
          <p className="text-xs mt-3 opacity-60">Built with curiosity + code.</p>
        </div>
        <nav className="flex flex-wrap gap-6 font-mono text-xs" aria-label="Footer">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[var(--color-accent)]"
          >
            <SiGithub className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[var(--color-accent)]"
          >
            <FaLinkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-[var(--color-accent)]">
            <MdEmail className="h-4 w-4" />
            Email
          </a>
        </nav>
        <p className="font-mono text-xs">© {year} {profile.firstName} Brahmankar</p>
      </div>
    </footer>
  )
}
