import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useIsDesktopPointer } from '../../hooks/useMediaQuery'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function CustomCursor() {
  const enabled = useIsDesktopPointer()
  const reduced = useReducedMotion()
  const [label, setLabel] = useState('')
  const [variant, setVariant] = useState('default')

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 18 })
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 18 })

  useEffect(() => {
    if (!enabled || reduced) {
      document.body.classList.remove('custom-cursor-active')
      return
    }
    document.body.classList.add('custom-cursor-active')

    const onMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const onOver = (e) => {
      const t = e.target.closest('[data-cursor]')
      if (!t) {
        setLabel('')
        setVariant('default')
        return
      }
      setVariant(t.dataset.cursor || 'default')
      setLabel(t.dataset.cursorLabel || '')
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [enabled, reduced, cursorX, cursorY])

  if (!enabled || reduced) return null

  const ringScale =
    variant === 'button' ? 1.8 : variant === 'project' ? 2.2 : variant === 'link' ? 1.4 : 1

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[var(--color-accent)] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-[var(--color-accent)]/50 flex items-center justify-center"
        style={{ x: ringX, y: ringY, scale: ringScale }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      >
        {label ? (
          <span className="font-mono text-[9px] tracking-widest text-[var(--color-accent)]">
            {label}
          </span>
        ) : null}
      </motion.div>
    </div>
  )
}
