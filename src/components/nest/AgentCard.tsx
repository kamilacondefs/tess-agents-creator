import { Agent, LLM_MODELS, FLOW_TYPES, AGENT_ROLES } from '@/types/squad';
import { useSquad } from '@/contexts/SquadContext';
import { Plus, Trash2, Users, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

type AgentCardProps = {
  agent: Agent;
  isMain?: boolean;
};

export function AgentCard({ agent, isMain = false }: AgentCardProps) {
  const { selectedAgentId, setSelectedAgentId, getSubAgents, addAgent, removeAgent } = useSquad();
  const subAgents = getSubAgents(agent.id);
  const model = LLM_MODELS.find(m => m.id === agent.llmModelId);
  const flow = FLOW_TYPES.find(f => f.type === agent.flowType);
  const role = AGENT_ROLES.find(r => r.value === agent.role);
  const isSelected = selectedAgentId === agent.id;

  return (
    <div className="flex flex-col items-center">
      {/* Main Card */}
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        onClick={() => setSelectedAgentId(agent.id)}
        className={`relative cursor-pointer rounded-xl border-2 transition-all ${
          isMain ? 'w-[280px]' : 'w-[240px]'
        } ${
          isSelected
            ? 'border-foreground tess-shadow-elevated'
            : 'border-border tess-shadow-card hover:border-tess-gray-300'
        } bg-card`}
      >
        {/* Color accent bar */}
        <div
          className="h-1 rounded-t-[10px]"
          style={{ backgroundColor: agent.color }}
        />

        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{role?.emoji}</span>
              <div>
                <h3 className={`font-semibold text-foreground ${isMain ? 'text-sm' : 'text-xs'}`}>
                  {agent.name}
                </h3>
                <p className="text-xs text-muted-foreground">{role?.label}</p>
              </div>
            </div>
            <button
              onClick={e => { e.stopPropagation(); removeAgent(agent.id); }}
              className="w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>

          {/* Model Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-xs font-medium text-secondary-foreground">
              {model?.icon} {model?.name || 'Selecione'}
            </span>
          </div>

          {/* Flow type (sub-agents only) */}
          {!isMain && flow && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowDownRight className="w-3 h-3" />
              <span>{flow.label}: {flow.description}</span>
            </div>
          )}

          {/* Sub-agent count */}
          {isMain && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="w-3 h-3" />
                <span>{subAgents.length} subagente{subAgents.length !== 1 ? 's' : ''}</span>
              </div>
              <button
                onClick={e => { e.stopPropagation(); addAgent(agent.id); }}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-foreground text-xs font-medium hover:bg-tess-gray-200 transition-colors border border-border"
              >
                <Plus className="w-3 h-3" />
                Sub
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Sub-agents */}
      {isMain && subAgents.length > 0 && (
        <div className="mt-2 relative">
          {/* Connection line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-border" />

          {/* Horizontal connector */}
          {subAgents.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 h-px bg-border" 
              style={{ width: `${Math.min(subAgents.length * 260, 800)}px`, maxWidth: '100%' }} 
            />
          )}

          <div className="flex gap-4 pt-6 justify-center flex-wrap">
            {subAgents.map(sub => (
              <div key={sub.id} className="flex flex-col items-center">
                {/* Vertical connector to sub */}
                <div className="w-px h-3 bg-border -mt-2 mb-1" />
                {/* Flow type indicator */}
                <div className="mb-1">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-secondary text-[10px] font-medium text-foreground border border-border">
                    {FLOW_TYPES.find(f => f.type === sub.flowType)?.label}
                  </span>
                </div>
                <AgentCard agent={sub} isMain={false} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
