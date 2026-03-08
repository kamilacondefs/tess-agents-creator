export type LLMModel = {
  id: string;
  name: string;
  provider: string;
  icon: string;
};

export const LLM_MODELS: LLMModel[] = [
  { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', icon: '🟣' },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', icon: '🟣' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', icon: '🟢' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', icon: '🟢' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', icon: '🔵' },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'Google', icon: '🔵' },
  { id: 'llama-3.1-70b', name: 'Llama 3.1 70B', provider: 'Meta', icon: '🟠' },
  { id: 'grok-2', name: 'Grok 2', provider: 'xAI', icon: '⚫' },
];

export type FlowConnection = {
  type: 'report' | 'delegate' | 'consult' | 'stream';
  label: string;
  description: string;
};

export const FLOW_TYPES: FlowConnection[] = [
  { type: 'report', label: 'Reporta', description: 'Envia resultado final ao principal' },
  { type: 'delegate', label: 'Delega', description: 'Recebe tarefas do principal' },
  { type: 'consult', label: 'Consulta', description: 'Troca informações bidirecionalmente' },
  { type: 'stream', label: 'Stream', description: 'Envia dados em tempo real' },
];

export type AgentRole = 
  | 'coordinator'
  | 'researcher'
  | 'writer'
  | 'analyst'
  | 'coder'
  | 'reviewer'
  | 'custom';

export const AGENT_ROLES: { value: AgentRole; label: string; emoji: string }[] = [
  { value: 'coordinator', label: 'Coordenador', emoji: '👑' },
  { value: 'researcher', label: 'Pesquisador', emoji: '🔍' },
  { value: 'writer', label: 'Redator', emoji: '✍️' },
  { value: 'analyst', label: 'Analista', emoji: '📊' },
  { value: 'coder', label: 'Desenvolvedor', emoji: '💻' },
  { value: 'reviewer', label: 'Revisor', emoji: '✅' },
  { value: 'custom', label: 'Personalizado', emoji: '⚙️' },
];

export type Agent = {
  id: string;
  name: string;
  role: AgentRole;
  roleLabel: string;
  llmModelId: string;
  systemPrompt: string;
  flowType: FlowConnection['type'];
  parentId: string | null;
  color: string;
  createdAt: number;
};

export type Squad = {
  id: string;
  name: string;
  description: string;
  agents: Agent[];
  createdAt: number;
  updatedAt: number;
};
