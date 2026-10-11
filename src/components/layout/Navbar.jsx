import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { scrollToSection } from '../../utils/scrollTo'

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(links.map((l) => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navTo = (id) => {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4">
      <motion.nav
        layout
        className={`mx-auto max-w-6xl rounded-2xl flex items-center justify-between gap-4 px-4 md:px-6 transition-all duration-300 border border-white/20 bg-[#0c0c12]/90 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl ${
          scrolled ? 'py-2.5' : 'py-3.5'
        }`}
        aria-label="Primary"
      >
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="shrink-0 font-semibold tracking-tight text-sm md:text-[15px] text-white"
          data-cursor="link"
          aria-label="Sahil Brahmankar — home"
        >
          {profile.name}
        </button>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => navTo(link.id)}
                className={`px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  active === link.id
                    ? 'text-[var(--color-accent)] bg-[var(--color-accent-muted)]'
                    : 'text-[var(--color-text-muted)] hover:text-white'
                }`}
                data-cursor="link"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="lg:hidden font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          data-cursor="button"
        >
          Menu
        </button>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden mx-auto max-w-6xl mt-2 rounded-2xl glass p-4"
          >
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => navTo(link.id)}
                    className="w-full text-left py-3 px-2 font-mono text-sm uppercase tracking-wider border-b border-white/5 last:border-0"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
