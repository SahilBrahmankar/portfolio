import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const NODE_COUNT = 28

function buildNodes(width, height) {
  const nodes = []
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: 1.5 + Math.random() * 2,
      pulse: Math.random() * Math.PI * 2,
    })
  }
  return nodes
}

export function NeuralNetwork({ className = '' }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let nodes = []
    let rafId
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      nodes = buildNodes(w, h)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }
    const onLeave = () => {
      mouseRef.current.active = false
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const mouse = mouseRef.current
      const maxDist = 120

      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > w) n.vx *= -1
          if (n.y < 0 || n.y > h) n.vy *= -1
          n.pulse += 0.02
        }

        if (mouse.active) {
          const dx = mouse.x - n.x
          const dy = mouse.y - n.y
          const dist = Math.hypot(dx, dy)
          if (dist < 140) {
            n.x -= (dx / dist) * 0.08
            n.y -= (dy / dist) * 0.08
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.35
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const n of nodes) {
        const glow = 0.4 + Math.sin(n.pulse) * 0.15
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 211, 238, ${glow})`
        ctx.fill()
      }

      if (mouse.active && !reduced) {
        const pulse = 0.15 + Math.sin(Date.now() / 400) * 0.05
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 40, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(34, 211, 238, ${pulse})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      rafId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      aria-hidden
    />
  )
}
