export const projects = [
  {
    id: 'ask-the-docs',
    number: '01',
    title: 'Ask the Docs: RAG Q&A with Citations',
    year: '2026',
    type: 'rag',
    accent: '#22d3ee',
    metric: '40 test questions',
    shortDescription:
      'Question-answering over a document corpus with source citations and honest “I don’t know” handling.',
    problem:
      'Teams need trustworthy answers from internal docs without hallucinating sources or missing retrieval edge cases.',
    contribution:
      'Designed ingestion, chunking, and retrieval pipeline; benchmarked configurations on a fixed test question set.',
    features: [
      'Source citations on every grounded answer',
      'Out-of-scope detection when context is insufficient',
      'Compared chunk sizes and vector vs hybrid search on 40 test questions',
    ],
    technologies: ['Python', 'LlamaIndex', 'pgvector', 'sentence-transformers'],
    github: null,
    demo: null,
  },
  {
    id: 'doc-json',
    number: '02',
    title: 'Document-to-JSON Extraction API',
    year: '2026',
    type: 'api',
    accent: '#a78bfa',
    metric: '30-document test set',
    shortDescription:
      'FastAPI service that turns invoices and resumes into validated JSON using LLM structured output.',
    problem:
      'Manual data entry from semi-structured documents is slow and error-prone; downstream systems need reliable schema-valid JSON.',
    contribution:
      'Built the API layer, Pydantic schemas, persistence, and prompt iteration loop on a labeled document set.',
    features: [
      'Schema-validated JSON via Pydantic',
      'PostgreSQL storage for extracted records',
      'Error handling and Gemini API integration',
      'Accuracy improvements through prompt iteration on a 30-document test set',
    ],
    technologies: ['Python', 'FastAPI', 'Pydantic', 'PostgreSQL', 'Gemini API'],
    github: null,
    demo: null,
  },
  {
    id: 'text-to-sql',
    number: '03',
    title: 'Text-to-SQL Analyst Agent',
    year: '2026',
    type: 'agent',
    accent: '#34d399',
    metric: '25 test questions',
    shortDescription:
      'LangGraph agent that reads schemas, writes SQL, self-corrects errors, and explains query results.',
    problem:
      'Analysts need natural-language access to relational data without sacrificing safety or explainability.',
    contribution:
      'Implemented the agent graph, SQL execution loop, safeguards, and evaluation on natural-language test questions.',
    features: [
      'Schema-aware SQL generation',
      'Self-correction on failed queries',
      'Natural-language explanations of results',
      'Query limits and approval-style safeguards',
    ],
    technologies: ['Python', 'LangGraph', 'PostgreSQL'],
    github: null,
    demo: null,
  },
]
