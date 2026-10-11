import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function PageIntro() {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(reduced)

  useEffect(() => {
    if (reduced) return
    const t = setTimeout(() => setDone(true), 1400)
    return () => clearTimeout(t)
  }, [reduced])

  if (done) return null

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-[var(--color-surface)] flex items-center justify-center pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
      onAnimationComplete={() => setDone(true)}
      aria-hidden
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs tracking-[0.35em] text-[var(--color-accent)] uppercase"
      >
        Initializing
      </motion.div>
    </motion.div>
  )
}
