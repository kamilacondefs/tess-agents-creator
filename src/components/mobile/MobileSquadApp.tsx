import { useSquad } from '@/contexts/SquadContext';
import { Plus, ChevronRight, Settings, Play, Layers, Users, Bot } from 'lucide-react';
import tessLogo from '@/assets/tess-light-logo.svg';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { LLM_MODELS, AGENT_ROLES } from '@/types/squad';

export function MobileSquadApp() {
  const { squad, getMainAgents, getSubAgents, selectedAgentId, setSelectedAgentId, addAgent, getSelectedAgent } = useSquad();
  const mainAgents = getMainAgents();
  const selectedAgent = getSelectedAgent();
  const [activeTab, setActiveTab] = useState<'hierarchy' | 'config'>('hierarchy');

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Mobile Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <img src={tessLogo} alt="TESS" className="h-4 w-auto" />
          <span className="text-muted-foreground text-[10px]">/</span>
          <span className="text-muted-foreground text-[10px] font-medium">SQUADS</span>
        </div>
        <button className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-foreground text-background text-[11px] font-medium">
          <Play className="w-3 h-3" />
          Executar
        </button>
      </div>

      {/* Squad name */}
      <div className="px-4 py-2.5 border-b border-border bg-card">
        <p className="font-semibold text-sm text-foreground">{squad.name}</p>
        <p className="text-[11px] text-muted-foreground">
          {mainAgents.length} principal · {squad.agents.length - mainAgents.length} sub
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-border bg-card">
        <button
          onClick={() => setActiveTab('hierarchy')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors border-b-2 ${
            activeTab === 'hierarchy'
              ? 'border-foreground text-foreground'
              : 'border-transparent text-muted-foreground'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Hierarquia
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors border-b-2 ${
            activeTab === 'config'
              ? 'border-foreground text-foreground'
              : 'border-transparent text-muted-foreground'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          Configurar
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'hierarchy' ? (
          <div className="p-4 tess-dot-pattern min-h-full">
            {mainAgents.length === 0 ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-3">
                    <Layers className="w-5 h-5 text-foreground" />
                  </div>
                  <h2 className="text-sm font-semibold text-foreground mb-1">Monte seu Squad</h2>
                  <p className="text-xs text-muted-foreground mb-4 max-w-[240px] mx-auto">
                    Adicione agentes para criar sua estrutura de IA
                  </p>
                  <button
                    onClick={() => addAgent(null)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Adicionar Agente
                  </button>
                </motion.div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Add button */}
                <button
                  onClick={() => addAgent(null)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-dashed border-border text-xs font-medium text-muted-foreground hover:bg-secondary transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Agente Principal
                </button>

                {/* Agent cards */}
                {mainAgents.map(agent => {
                  const subs = getSubAgents(agent.id);
                  const role = AGENT_ROLES.find(r => r.value === agent.role);
                  const model = LLM_MODELS.find(m => m.id === agent.llmModelId);

                  return (
                    <div key={agent.id}>
                      <motion.button
                        layout
                        onClick={() => {
                          setSelectedAgentId(agent.id);
                          setActiveTab('config');
                        }}
                        className={`w-full text-left rounded-xl border-2 transition-all bg-card p-3 ${
                          selectedAgentId === agent.id
                            ? 'border-foreground tess-shadow-elevated'
                            : 'border-border tess-shadow-card'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: agent.color }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-foreground truncate">{agent.name}</p>
                            <p className="text-[10px] text-muted-foreground">{role?.label}</p>
                          </div>
                          <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                            {model?.name || 'N/A'}
                          </span>
                        </div>
                        {subs.length > 0 && (
                          <div className="flex items-center gap-1 mt-2 pt-2 border-t border-border">
                            <Users className="w-3 h-3 text-muted-foreground" />
                            <span className="text-[10px] text-muted-foreground">
                              {subs.length} subagente{subs.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                        )}
                      </motion.button>

                      {/* Sub-agents */}
                      {subs.map(sub => {
                        const subRole = AGENT_ROLES.find(r => r.value === sub.role);
                        return (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setSelectedAgentId(sub.id);
                              setActiveTab('config');
                            }}
                            className={`w-full text-left ml-4 mt-1.5 rounded-lg border p-2.5 transition-all bg-card ${
                              selectedAgentId === sub.id ? 'border-foreground' : 'border-border'
                            }`}
                            style={{ width: 'calc(100% - 16px)' }}
                          >
                            <div className="flex items-center gap-2">
                              <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                              <div
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: sub.color }}
                              />
                              <span className="text-[11px] font-medium text-foreground truncate">{sub.name}</span>
                              <span className="text-[9px] text-muted-foreground ml-auto">{subRole?.label}</span>
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
          /* Config tab */
          <div className="p-4">
            {selectedAgent ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedAgent.color }} />
                  <h3 className="text-sm font-semibold text-foreground">{selectedAgent.name}</h3>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={selectedAgent.name}
                    readOnly
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Papel
                  </label>
                  <div className="grid grid-cols-2 gap-1">
                    {AGENT_ROLES.map(r => (
                      <div
                        key={r.value}
                        className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border text-[10px] font-medium ${
                          selectedAgent.role === r.value
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border text-foreground'
                        }`}
                      >
                        <span>{r.emoji}</span>
                        <span>{r.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Model */}
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Modelo LLM
                  </label>
                  <div className="px-3 py-2 rounded-lg border border-input bg-secondary text-xs text-foreground">
                    {LLM_MODELS.find(m => m.id === selectedAgent.llmModelId)?.name || 'N/A'}
                  </div>
                </div>

                {/* Prompt preview */}
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Prompt de Sistema
                  </label>
                  <div className="px-3 py-2 rounded-lg border border-input bg-secondary text-[11px] text-muted-foreground h-[80px] overflow-hidden">
                    {selectedAgent.systemPrompt || 'Nenhum prompt definido...'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px]">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-2">
                    <span className="text-base">🎯</span>
                  </div>
                  <p className="text-xs font-medium text-foreground">Selecione um agente</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Toque em um card na aba Hierarquia</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
