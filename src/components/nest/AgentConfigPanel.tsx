import { useSquad } from '@/contexts/SquadContext';
import { LLM_MODELS, AGENT_ROLES, FLOW_TYPES } from '@/types/squad';
import { X } from 'lucide-react';

export function AgentConfigPanel() {
  const { getSelectedAgent, updateAgent, selectedAgentId, setSelectedAgentId } = useSquad();
  const agent = getSelectedAgent();

  if (!agent) {
    return (
      <div className="w-[320px] border-l border-border bg-card flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">🎯</span>
          </div>
          <p className="text-sm font-medium text-foreground">Selecione um agente</p>
          <p className="text-xs text-muted-foreground mt-1">Clique em um card para configurar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[320px] border-l border-border bg-card flex flex-col h-full">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-5 border-b border-border">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: agent.color }}
          />
          <h3 className="text-sm font-semibold text-foreground">Configurar Agente</h3>
        </div>
        <button
          onClick={() => setSelectedAgentId(null)}
          className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto tess-scrollbar p-5 space-y-5">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
            Nome
          </label>
          <input
            type="text"
            value={agent.name}
            onChange={e => updateAgent(agent.id, { name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/20 transition-shadow"
            placeholder="Ex: Agente Pesquisador"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
            Papel / Role
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {AGENT_ROLES.map(r => (
              <button
                key={r.value}
                onClick={() => updateAgent(agent.id, { role: r.value, roleLabel: r.label })}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg border text-xs font-medium transition-colors ${
                  agent.role === r.value
                    ? 'border-accent bg-tess-purple-light text-accent'
                    : 'border-border bg-background text-foreground hover:bg-secondary'
                }`}
              >
                <span>{r.emoji}</span>
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* LLM Model */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
            Modelo LLM
          </label>
          <select
            value={agent.llmModelId}
            onChange={e => updateAgent(agent.id, { llmModelId: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/20 transition-shadow appearance-none cursor-pointer"
          >
            {LLM_MODELS.map(m => (
              <option key={m.id} value={m.id}>
                {m.icon} {m.name} — {m.provider}
              </option>
            ))}
          </select>
        </div>

        {/* Flow Type */}
        {agent.parentId && (
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Tipo de Conexão
            </label>
            <div className="space-y-1.5">
              {FLOW_TYPES.map(f => (
                <button
                  key={f.type}
                  onClick={() => updateAgent(agent.id, { flowType: f.type })}
                  className={`w-full flex items-start gap-2.5 px-3 py-2.5 rounded-lg border text-left transition-colors ${
                    agent.flowType === f.type
                      ? 'border-accent bg-tess-purple-light'
                      : 'border-border bg-background hover:bg-secondary'
                  }`}
                >
                  <div>
                    <p className={`text-xs font-semibold ${
                      agent.flowType === f.type ? 'text-accent' : 'text-foreground'
                    }`}>
                      {f.label}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{f.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* System Prompt */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
            Prompt de Sistema
          </label>
          <textarea
            value={agent.systemPrompt}
            onChange={e => updateAgent(agent.id, { systemPrompt: e.target.value })}
            rows={5}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/20 transition-shadow resize-none"
            placeholder="Você é um agente especializado em..."
          />
          <p className="text-[11px] text-muted-foreground mt-1">
            Defina a personalidade e comportamento do agente
          </p>
        </div>
      </div>
    </div>
  );
}
