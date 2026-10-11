import Lenis from 'lenis'
import { useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useLenis(enabled = true) {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!enabled || reducedMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [enabled, reducedMotion])
}
