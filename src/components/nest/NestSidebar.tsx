import { useSquad } from '@/contexts/SquadContext';
import { Plus, ChevronRight } from 'lucide-react';

export function NestSidebar() {
  const { squad, getMainAgents, getSubAgents, selectedAgentId, setSelectedAgentId, addAgent } = useSquad();
  const mainAgents = getMainAgents();

  return (
    <div className="w-[260px] border-r border-border bg-card flex flex-col h-full">
      {/* Logo */}
      <div className="h-14 flex items-center px-5 border-b border-border">
        <img src={new URL('/src/assets/tess-logo.svg', import.meta.url).href} alt="TESS" className="h-8" />
        <span className="text-muted-foreground text-xs ml-2">/</span>
        <span className="text-muted-foreground text-xs font-medium ml-2">SQUADS</span>
      </div>

      {/* Squad Info */}
      <div className="p-4 border-b border-border">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Squad Ativo</h2>
        <div className="bg-secondary rounded-lg p-3">
          <p className="font-semibold text-sm text-foreground truncate">{squad.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{squad.agents.length} agente{squad.agents.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Agent Tree */}
      <div className="flex-1 overflow-y-auto tess-scrollbar p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Hierarquia</h2>
          <button onClick={() => addAgent(null)} className="w-6 h-6 rounded-md bg-accent text-accent-foreground flex items-center justify-center hover:opacity-90 transition-opacity">
            
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {mainAgents.length === 0 &&
        <p className="text-xs text-muted-foreground text-center py-8">
            Adicione seu primeiro agente para começar
          </p>
        }

        <div className="space-y-1">
          {mainAgents.map((agent) => {
            const subs = getSubAgents(agent.id);
            return (
              <div key={agent.id}>
                <button
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors text-sm ${
                  selectedAgentId === agent.id ?
                  'bg-tess-purple-light text-accent' :
                  'hover:bg-secondary text-foreground'}`
                  }>
                  
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: agent.color }} />
                  
                  <span className="truncate font-medium">{agent.name}</span>
                  {subs.length > 0 &&
                  <span className="ml-auto text-xs text-muted-foreground">{subs.length}</span>
                  }
                </button>
                {subs.map((sub) =>
                <button
                  key={sub.id}
                  onClick={() => setSelectedAgentId(sub.id)}
                  className={`w-full flex items-center gap-2 pl-8 pr-3 py-1.5 rounded-lg text-left transition-colors text-xs ${
                  selectedAgentId === sub.id ?
                  'bg-tess-purple-light text-accent' :
                  'hover:bg-secondary text-muted-foreground'}`
                  }>
                  
                    <ChevronRight className="w-3 h-3 flex-shrink-0 opacity-40" />
                    <span className="truncate">{sub.name}</span>
                  </button>
                )}
              </div>);

          })}
        </div>
      </div>
    </div>);

}