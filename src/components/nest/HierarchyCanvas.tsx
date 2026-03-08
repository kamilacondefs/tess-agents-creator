import { useSquad } from '@/contexts/SquadContext';
import { AgentCard } from './AgentCard';
import { Plus, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function HierarchyCanvas() {
  const { getMainAgents, addAgent, squad } = useSquad();
  const mainAgents = getMainAgents();

  return (
    <div className="flex-1 bg-background overflow-auto tess-scrollbar">
      {/* Background pattern */}
      <div className="min-h-full p-8 tess-dot-pattern">
        {mainAgents.length === 0 ? (
          /* Empty state */
          <div className="flex items-center justify-center h-full min-h-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <Layers className="w-7 h-7 text-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Monte seu Squad</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Adicione agentes principais e subagentes para criar sua estrutura de inteligência artificial
              </p>
              <button
                onClick={() => addAgent(null)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Adicionar Agente Principal
              </button>
            </motion.div>
          </div>
        ) : (
          /* Agent hierarchy */
          <div>
            {/* Stats bar */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs text-muted-foreground">
                {mainAgents.length} principal{mainAgents.length !== 1 ? 'is' : ''} · {squad.agents.length - mainAgents.length} subagente{(squad.agents.length - mainAgents.length) !== 1 ? 's' : ''}
              </span>
              <button
                onClick={() => addAgent(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:bg-secondary transition-colors"
              >
                <Plus className="w-3 h-3" />
                Agente Principal
              </button>
            </div>

            {/* Agent cards layout */}
            <AnimatePresence>
              <div className="flex flex-wrap gap-8 justify-start">
                {mainAgents.map(agent => (
                  <AgentCard key={agent.id} agent={agent} isMain />
                ))}
              </div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
