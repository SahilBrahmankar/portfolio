import { motion } from 'framer-motion'

function ScanLine({ color }) {
  return (
    <motion.div
      className="pointer-events-none absolute left-0 right-0 h-px"
      style={{ background: color, boxShadow: `0 0 12px ${color}` }}
      animate={{ top: ['8%', '92%', '8%'] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
    />
  )
}

function RagVisual({ color }) {
  const docs = [
    { x: '12%', y: '28%', label: 'chunk_01' },
    { x: '38%', y: '18%', label: 'chunk_14' },
    { x: '64%', y: '26%', label: 'chunk_22' },
    { x: '22%', y: '58%', label: 'chunk_07' },
    { x: '52%', y: '62%', label: 'chunk_31' },
    { x: '78%', y: '52%', label: 'chunk_40' },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <ScanLine color={color} />

      <div className="absolute left-6 right-6 top-6 rounded-full border border-white/10 bg-black/40 px-4 py-2 font-mono text-[10px] text-white/60">
        <span className="text-white/35">QUERY</span>
        <span className="ml-3">What does the policy say about retrieval?</span>
        <motion.span
          className="ml-2 inline-block h-3 w-1.5 align-middle"
          style={{ background: color }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
        />
      </div>

      {docs.map((d, i) => (
        <motion.div
          key={d.label}
          className="absolute h-14 w-20 rounded-md border bg-black/50"
          style={{
            left: d.x,
            top: d.y,
            borderColor: `${color}55`,
            boxShadow: `0 0 20px ${color}22`,
          }}
          animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 3 + i * 0.2, repeat: Infinity }}
        >
          <div className="h-1.5 w-full" style={{ background: `${color}33` }} />
          <p className="px-1.5 pt-2 font-mono text-[8px]" style={{ color }}>
            {d.label}
          </p>
        </motion.div>
      ))}

      <motion.div
        className="absolute bottom-6 left-6 right-6 rounded-xl border bg-black/60 p-4 backdrop-blur-sm"
        style={{ borderColor: `${color}44` }}
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <p className="font-mono text-[9px] tracking-widest text-white/40">GROUNDED ANSWER</p>
        <p className="mt-2 text-xs text-white/80">Cited from source · I don&apos;t know when context is missing</p>
        <div className="mt-3 flex gap-2">
          {['doc_042', 'p.3', 'hit+'].map((t) => (
            <span
              key={t}
              className="rounded-full px-2 py-0.5 font-mono text-[9px]"
              style={{ background: `${color}22`, color }}
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function ApiVisual({ color }) {
  const lines = [
    '{',
    '  "type": "invoice",',
    '  "vendor": "validated",',
    '  "total": 1240.00,',
    '  "schema": "ok"',
    '}',
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      <ScanLine color={color} />
      <div className="grid h-full grid-cols-2">
        <div className="flex flex-col justify-center gap-3 border-r border-white/10 p-6">
          {['INVOICE.pdf', 'RESUME.pdf', 'FORM.pdf'].map((name, i) => (
            <motion.div
              key={name}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-3"
              animate={{ x: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.4, delay: i * 0.35, repeat: Infinity }}
            >
              <div className="mb-2 h-1.5 w-10 rounded" style={{ background: color }} />
              <p className="font-mono text-[10px] text-white/70">{name}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center p-6">
          <pre className="font-mono text-[11px] leading-6" style={{ color }}>
            {lines.map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0.2 }}
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 2.8, delay: i * 0.15, repeat: Infinity }}
              >
                {line}
              </motion.div>
            ))}
          </pre>
        </div>
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-white/40">
        Pydantic · Gemini · FastAPI
      </div>
    </div>
  )
}

function AgentVisual({ color }) {
  const nodes = [
    { label: 'SCHEMA', x: '12%', y: '30%' },
    { label: 'SQL', x: '40%', y: '22%' },
    { label: 'FIX', x: '62%', y: '42%' },
    { label: 'EXPLAIN', x: '38%', y: '62%' },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      <ScanLine color={color} />
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        <motion.path
          d="M 90 120 C 160 80, 220 90, 280 100"
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.35"
        />
        <motion.path
          d="M 300 130 C 360 180, 400 190, 430 180"
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.35"
        />
        <motion.path
          d="M 420 200 C 340 250, 280 270, 250 250"
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.35"
        />
        <motion.circle
          r="5"
          fill={color}
          animate={{
            offsetDistance: ['0%', '100%'],
          }}
        />
      </svg>
      {nodes.map((n, i) => (
        <motion.div
          key={n.label}
          className="absolute flex h-16 w-16 items-center justify-center rounded-full border bg-black/70 font-mono text-[9px] tracking-wider"
          style={{ left: n.x, top: n.y, borderColor: color, color, boxShadow: `0 0 24px ${color}33` }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.2, delay: i * 0.25, repeat: Infinity }}
        >
          {n.label}
        </motion.div>
      ))}
      <motion.p
        className="absolute bottom-8 left-8 right-8 font-mono text-[11px]"
        style={{ color }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        SELECT region, SUM(revenue) … → execute → self-correct
      </motion.p>
    </div>
  )
}

export function ProjectVisual({ type, accent = '#22d3ee' }) {
  if (type === 'api') return <ApiVisual color={accent} />
  if (type === 'agent') return <AgentVisual color={accent} />
  return <RagVisual color={accent} />
}
