import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/** Subtle GSAP blur-to-sharp reveals on section headings */
export function useGsapSectionReveal(selector = '[data-gsap-reveal]') {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const elements = document.querySelectorAll(selector)
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [reduced, selector])
}
