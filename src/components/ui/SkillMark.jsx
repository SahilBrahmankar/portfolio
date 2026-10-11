import {
  SiPython,
  SiPostgresql,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiHuggingface,
  SiJupyter,
  SiFastapi,
  SiDocker,
  SiGit,
  SiGithub,
  SiGraphql,
  SiRedis,
  SiRender,
} from 'react-icons/si'

export function SkillMark({ name, color = '#22d3ee' }) {
  const n = name.toLowerCase()
  const common = 'h-4 w-4 shrink-0'

  if (n.includes('python')) {
    return <SiPython className={common} style={{ color }} />
  }
  if (n === 'sql' || n.includes('postgres') || n.includes('pgvector')) {
    return <SiPostgresql className={common} style={{ color }} />
  }
  if (n.includes('scikit')) {
    return <SiScikitlearn className={common} style={{ color }} />
  }
  if (n.includes('panda')) {
    return <SiPandas className={common} style={{ color }} />
  }
  if (n.includes('numpy')) {
    return <SiNumpy className={common} style={{ color }} />
  }
  if (n.includes('hugging') || n.includes('transform') || n.includes('spaces')) {
    return <SiHuggingface className={common} style={{ color }} />
  }
  if (n.includes('jupyter')) {
    return <SiJupyter className={common} style={{ color }} />
  }
  if (n.includes('fastapi')) {
    return <SiFastapi className={common} style={{ color }} />
  }
  if (n.includes('docker')) {
    return <SiDocker className={common} style={{ color }} />
  }
  if (n.includes('git')) {
    return <SiGit className={common} style={{ color }} />
  }
  if (n.includes('github')) {
    return <SiGithub className={common} style={{ color }} />
  }
  if (n.includes('redis')) {
    return <SiRedis className={common} style={{ color }} />
  }
  if (n.includes('graphql')) {
    return <SiGraphql className={common} style={{ color }} />
  }
  if (n.includes('render')) {
    return <SiRender className={common} style={{ color }} />
  }
  if (n.includes('chroma')) {
    return <SiGraphql className={common} style={{ color }} />
  }
  if (n.includes('langchain') || n.includes('llama') || n.includes('rag') || n.includes('prompt') || n.includes('tool') || n === 'mcp' || n.includes('agent')) {
    return <SiPython className={common} style={{ color }} />
  }
  if (n.includes('rest') || n.includes('api')) {
    return <SiFastapi className={common} style={{ color }} />
  }
  if (n.includes('pydantic')) {
    return <SiPython className={common} style={{ color }} />
  }
  // Default fallback
  return (
    <svg viewBox="0 0 24 24" className={common} aria-hidden>
      <rect x="5" y="5" width="14" height="14" rx="3" fill="none" stroke={color} strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2" fill={color} />
    </svg>
  )
}
