import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const motionButton = motion.button
const motionA = motion.a

export function MagneticButton({
  children,
  className = '',
  as = 'button',
  strength = 0.35,
  ...props
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  function onMove(e) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  const Comp = as === 'a' ? motionA : motionButton
  const style = reduced ? undefined : { x: springX, y: springY }

  return (
    <Comp
      ref={ref}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  )
}
