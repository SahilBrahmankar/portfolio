import { useEffect, useMemo, useRef } from 'react'
import { allSkillsFlat } from '../../data/skills'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const FEATURED = new Set([
  'Python',
  'SQL',
  'RAG',
  'LangGraph',
  'LlamaIndex',
  'FastAPI',
  'Prompt Engineering',
  'PostgreSQL',
  'Pydantic',
  'Tool Calling',
])

function fibonacciSphere(count, radius) {
  const pts = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    pts.push({
      x: Math.cos(theta) * r * radius,
      y: y * radius,
      z: Math.sin(theta) * r * radius,
    })
  }
  return pts
}

function rotate(p, rotX, rotY) {
  const cosY = Math.cos(rotY)
  const sinY = Math.sin(rotY)
  const x1 = p.x * cosY - p.z * sinY
  const z1 = p.x * sinY + p.z * cosY
  const cosX = Math.cos(rotX)
  const sinX = Math.sin(rotX)
  const y2 = p.y * cosX - z1 * sinX
  const z2 = p.y * sinX + z1 * cosX
  return { x: x1, y: y2, z: z2 }
}

function hexToRgb(hex) {
  const n = hex.replace('#', '')
  const v = parseInt(n, 16)
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 }
}

export function SkillGlobe() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const labelsRef = useRef(null)
  const reduced = useReducedMotion()

  const items = useMemo(() => {
    const radius = 1
    const pts = fibonacciSphere(allSkillsFlat.length, radius)
    return allSkillsFlat.map((skill, i) => ({
      ...skill,
      p: pts[i],
      featured: FEATURED.has(skill.name),
      rgb: hexToRgb(skill.color),
    }))
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const labelsEl = labelsRef.current
    if (!wrap || !canvas || !labelsEl) return

    const ctx = canvas.getContext('2d')
    const state = {
      rotX: -0.18,
      rotY: 0.4,
      velX: 0,
      velY: reduced ? 0 : 0.0032,
      dragging: false,
      lastX: 0,
      lastY: 0,
      w: 0,
      h: 0,
      stars: [],
    }

    const nodes = items.map((item) => {
      const el = document.createElement('span')
      el.textContent = item.name
      el.className = 'absolute left-1/2 top-1/2 whitespace-nowrap pointer-events-none select-none will-change-transform'
      el.style.fontFamily = item.featured
        ? "'Space Grotesk', system-ui, sans-serif"
        : "'JetBrains Mono', ui-monospace, monospace"
      el.style.fontWeight = item.featured ? '600' : '500'
      el.style.color = item.color
      el.style.textShadow = `0 0 18px ${item.color}55`
      labelsEl.appendChild(el)
      return { ...item, el }
    })

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      state.w = rect.width
      state.h = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = state.w * dpr
      canvas.height = state.h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.floor((state.w * state.h) / 900)
      state.stars = Array.from({ length: count }, () => ({
        x: Math.random() * state.w,
        y: Math.random() * state.h,
        r: Math.random() * 1.2,
        a: 0.15 + Math.random() * 0.55,
      }))
    }

    const onPointerDown = (e) => {
      state.dragging = true
      state.velX = 0
      state.velY = 0
      state.lastX = e.clientX
      state.lastY = e.clientY
      wrap.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e) => {
      if (!state.dragging) return
      const dx = e.clientX - state.lastX
      const dy = e.clientY - state.lastY
      state.lastX = e.clientX
      state.lastY = e.clientY
      state.rotY += dx * 0.008
      state.rotX += dy * 0.008
      state.rotX = Math.max(-1.2, Math.min(1.2, state.rotX))
      state.velY = dx * 0.00035
      state.velX = dy * 0.00035
    }

    const onPointerUp = (e) => {
      state.dragging = false
      try {
        wrap.releasePointerCapture(e.pointerId)
      } catch {
        /* already released */
      }
    }

    let rafId
    const draw = () => {
      if (!state.dragging && !reduced) {
        state.rotY += state.velY || 0.0032
        state.rotX += state.velX
        state.velX *= 0.96
        state.velY = state.velY * 0.96 + 0.0032 * 0.04
        state.rotX *= 0.992
      }

      ctx.clearRect(0, 0, state.w, state.h)
      ctx.fillStyle = '#020308'
      ctx.fillRect(0, 0, state.w, state.h)
      for (const s of state.stars) {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.a})`
        ctx.fill()
      }

      const size = Math.min(state.w, state.h)
      const radius = size * 0.34

      const projected = nodes.map((node) => {
        const r = rotate(node.p, state.rotX, state.rotY)
        const depth = (r.z + 1) / 2
        return { node, r, depth }
      })
      projected.sort((a, b) => a.depth - b.depth)

      for (const { node, r, depth } of projected) {
        const x = r.x * radius
        const y = r.y * radius
        const scale = 0.55 + depth * 0.9
        const featuredBoost = node.featured ? 1.35 : 1
        const fontSize = Math.max(9, size * 0.018 * scale * featuredBoost)
        const alpha = 0.22 + depth * 0.78
        node.el.style.fontSize = `${fontSize}px`
        node.el.style.opacity = String(alpha)
        node.el.style.zIndex = String(Math.round(depth * 100))
        node.el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${0.85 + depth * 0.3})`
      }

      rafId = requestAnimationFrame(draw)
    }

    const onPointerDownSafe = (e) => {
      e.preventDefault()
      onPointerDown(e)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    wrap.addEventListener('pointerdown', onPointerDownSafe)
    wrap.addEventListener('pointermove', onPointerMove)
    wrap.addEventListener('pointerup', onPointerUp)
    wrap.addEventListener('pointercancel', onPointerUp)
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      wrap.removeEventListener('pointerdown', onPointerDownSafe)
      wrap.removeEventListener('pointermove', onPointerMove)
      wrap.removeEventListener('pointerup', onPointerUp)
      wrap.removeEventListener('pointercancel', onPointerUp)
      labelsEl.replaceChildren()
    }
  }, [items, reduced])

  return (
    <div
      ref={wrapRef}
      className="relative h-full w-full cursor-grab touch-none active:cursor-grabbing"
      data-lenis-prevent
      data-cursor="project"
      data-cursor-label="SPIN"
      role="img"
      aria-label="Interactive rotating globe of skills. Drag to spin."
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <div ref={labelsRef} className="absolute inset-0 overflow-hidden" aria-hidden />
      <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center font-mono text-[10px] tracking-[0.35em] text-white/45">
        DRAG TO SPIN
      </p>
    </div>
  )
}
