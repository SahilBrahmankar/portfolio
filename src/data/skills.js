export const skillCategories = [
  {
    id: 'programming',
    label: 'Programming',
    color: '#22d3ee',
    skills: ['Python', 'SQL'],
  },
  {
    id: 'ml-data',
    label: 'ML & Data',
    color: '#67e8f9',
    skills: [
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Hugging Face Transformers',
      'Jupyter',
    ],
  },
  {
    id: 'llm',
    label: 'LLM & Agentic AI',
    color: '#a78bfa',
    skills: [
      'Prompt Engineering',
      'RAG',
      'Tool Calling',
      'LangGraph',
      'LlamaIndex',
      'MCP',
    ],
  },
  {
    id: 'datastores',
    label: 'Databases & Vector Search',
    color: '#34d399',
    skills: ['PostgreSQL', 'pgvector', 'ChromaDB'],
  },
  {
    id: 'backend',
    label: 'Backend & Deployment',
    color: '#fbbf24',
    skills: [
      'FastAPI',
      'Pydantic',
      'REST APIs',
      'Docker',
      'Hugging Face Spaces',
      'Render',
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    color: '#94a3b8',
    skills: ['Git', 'GitHub'],
  },
]

/** Related skill edges for constellation hover highlights */
export const skillLinks = [
  ['Python', 'Pandas'],
  ['Python', 'FastAPI'],
  ['Python', 'LangGraph'],
  ['Python', 'LlamaIndex'],
  ['SQL', 'PostgreSQL'],
  ['RAG', 'LlamaIndex'],
  ['RAG', 'pgvector'],
  ['LangGraph', 'Tool Calling'],
  ['FastAPI', 'Pydantic'],
  ['FastAPI', 'REST APIs'],
  ['PostgreSQL', 'pgvector'],
  ['Prompt Engineering', 'RAG'],
  ['Pandas', 'NumPy'],
  ['Scikit-learn', 'Jupyter'],
]

export const allSkillsFlat = skillCategories.flatMap((c) =>
  c.skills.map((name) => ({ name, category: c.id, color: c.color })),
)
