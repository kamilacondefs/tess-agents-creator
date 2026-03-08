import { useSquad } from '@/contexts/SquadContext';
import { Plus, ChevronRight, Settings, Play, Layers, Users, Trash2 } from 'lucide-react';
import tessLogo from '@/assets/tess-light-logo.svg';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { LLM_MODELS, AGENT_ROLES } from '@/types/squad';

function TessPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="tess-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.8" />
        </pattern>
        <pattern id="tess-diag" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 0 20 L 20 0" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tess-grid)" />
      <rect width="100%" height="100%" fill="url(#tess-diag)" />
    </svg>
  );
}

function FloatingGraphic({ className }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-foreground opacity-[0.06]">
        <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1" />
        <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="0.5" />
        <line x1="24" y1="1" x2="24" y2="47" stroke="currentColor" strokeWidth="0.5" />
        <line x1="1" y1="24" x2="47" y2="24" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export function MobileSquadApp() {
  const { squad, getMainAgents, getSubAgents, selectedAgentId, setSelectedAgentId, addAgent, getSelectedAgent, updateAgent, removeAgent } = useSquad();
  const mainAgents = getMainAgents();
  const selectedAgent = getSelectedAgent();
  const [activeTab, setActiveTab] = useState<'hierarchy' | 'config'>('hierarchy');

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      <TessPattern />
      <FloatingGraphic className="top-[120px] right-[-10px]" />
      <FloatingGraphic className="bottom-[200px] left-[-8px]" />

      {/* Mobile Header */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-border bg-card/90 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <img src={tessLogo} alt="TESS" className="h-5 w-auto" />
          <span className="text-muted-foreground text-xs">/</span>
          <span className="text-muted-foreground text-xs font-semibold tracking-widest">SQUADS</span>
        </div>
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-foreground text-background text-xs font-semibold">
          <Play className="w-3.5 h-3.5" />
          Executar
        </button>
      </div>

      {/* Squad name */}
      <div className="relative z-10 px-4 py-3 border-b border-border bg-card/90 backdrop-blur-sm">
        <p className="font-bold text-base text-foreground">{squad.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {mainAgents.length} principal · {squad.agents.length - mainAgents.length} sub
        </p>
      </div>

      {/* Tab bar */}
      <div className="relative z-10 flex border-b border-border bg-card/90 backdrop-blur-sm">
        <button
          onClick={() => setActiveTab('hierarchy')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'hierarchy' ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground'
          }`}
        >
          <Layers className="w-4 h-4" />
          Hierarquia
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'config' ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground'
          }`}
        >
          <Settings className="w-4 h-4" />
          Configurar
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        {activeTab === 'hierarchy' ? (
          <div className="p-4 min-h-full">
            {mainAgents.length === 0 ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                    <Layers className="w-6 h-6 text-foreground" />
                  </div>
                  <h2 className="text-base font-bold text-foreground mb-1.5">Monte seu Squad</h2>
                  <p className="text-sm text-muted-foreground mb-5 max-w-[260px] mx-auto leading-relaxed">
                    Adicione agentes para criar sua estrutura de IA
                  </p>
                  <button
                    onClick={() => addAgent(null)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar Agente
                  </button>
                </motion.div>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => addAgent(null)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-border text-sm font-semibold text-muted-foreground hover:bg-secondary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Agente Principal
                </button>

                {mainAgents.map(agent => {
                  const subs = getSubAgents(agent.id);
                  const role = AGENT_ROLES.find(r => r.value === agent.role);
                  const model = LLM_MODELS.find(m => m.id === agent.llmModelId);

                  return (
                    <div key={agent.id}>
                      <motion.button
                        layout
                        onClick={() => { setSelectedAgentId(agent.id); setActiveTab('config'); }}
                        className={`w-full text-left rounded-xl border-2 transition-all bg-card p-4 ${
                          selectedAgentId === agent.id ? 'border-foreground tess-shadow-elevated' : 'border-border tess-shadow-card'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: agent.color }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-foreground truncate">{agent.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{role?.label}</p>
                          </div>
                          <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-lg font-medium">
                            {model?.name || 'N/A'}
                          </span>
                        </div>
                        {subs.length > 0 && (
                          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border">
                            <Users className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground font-medium">
                              {subs.length} subagente{subs.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                        )}
                      </motion.button>

                      {/* Add subagent button */}
                      <button
                        onClick={() => { addAgent(agent.id); setActiveTab('config'); }}
                        className="ml-4 mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        <Plus className="w-3 h-3" />
                        Subagente
                      </button>

                      {subs.map(sub => {
                        const subRole = AGENT_ROLES.find(r => r.value === sub.role);
                        return (
                          <button
                            key={sub.id}
                            onClick={() => { setSelectedAgentId(sub.id); setActiveTab('config'); }}
                            className={`w-full text-left ml-4 mt-2 rounded-xl border p-3 transition-all bg-card ${
                              selectedAgentId === sub.id ? 'border-foreground' : 'border-border'
                            }`}
                            style={{ width: 'calc(100% - 16px)' }}
                          >
                            <div className="flex items-center gap-2.5">
                              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: sub.color }} />
                              <span className="text-sm font-semibold text-foreground truncate">{sub.name}</span>
                              <span className="text-xs text-muted-foreground ml-auto">{subRole?.label}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="p-4">
            {selectedAgent ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedAgent.color }} />
                    <h3 className="text-base font-bold text-foreground">{selectedAgent.name}</h3>
                  </div>
                  <button
                    onClick={() => { removeAgent(selectedAgent.id); setActiveTab('hierarchy'); }}
                    className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Nome</label>
                  <input
                    type="text"
                    value={selectedAgent.name}
                    onChange={e => updateAgent(selectedAgent.id, { name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Papel</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {AGENT_ROLES.map(r => (
                      <button
                        key={r.value}
                        onClick={() => updateAgent(selectedAgent.id, { role: r.value })}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                          selectedAgent.role === r.value
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border text-foreground hover:bg-secondary'
                        }`}
                      >
                        <span>{r.emoji}</span>
                        <span>{r.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Modelo LLM</label>
                  <div className="space-y-1.5">
                    {LLM_MODELS.map(m => (
                      <button
                        key={m.id}
                        onClick={() => updateAgent(selectedAgent.id, { llmModelId: m.id })}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                          selectedAgent.llmModelId === m.id
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border text-foreground hover:bg-secondary'
                        }`}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prompt */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Prompt de Sistema</label>
                  <textarea
                    value={selectedAgent.systemPrompt || ''}
                    onChange={e => updateAgent(selectedAgent.id, { systemPrompt: e.target.value })}
                    placeholder="Descreva o comportamento deste agente..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm text-foreground h-[90px] resize-none focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  />
                </div>

                {/* Add subagent (only for main agents) */}
                {!selectedAgent.parentId && (
                  <button
                    onClick={() => { addAgent(selectedAgent.id); }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-border text-sm font-semibold text-muted-foreground hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar Subagente
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px]">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg">🎯</span>
                  </div>
                  <p className="text-sm font-bold text-foreground">Selecione um agente</p>
                  <p className="text-xs text-muted-foreground mt-1">Toque em um card na aba Hierarquia</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
