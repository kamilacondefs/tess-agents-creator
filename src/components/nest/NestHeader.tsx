import { useSquad } from '@/contexts/SquadContext';
import { Save, Play, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

export function NestHeader() {
  const { squad, updateSquad } = useSquad();

  const handleExecutar = () => {
    if (squad.agents.length === 0) {
      toast.error('Adicione pelo menos um agente antes de executar.');
      return;
    }
    toast.success('Squad enviado para execução!', {
      description: `${squad.agents.length} agente${squad.agents.length !== 1 ? 's' : ''} inicializado${squad.agents.length !== 1 ? 's' : ''}.`,
    });
  };

  const handleSalvar = () => {
    toast.success('Squad salvo com sucesso!');
  };

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div>
          <input
            type="text"
            value={squad.name}
            onChange={e => updateSquad({ name: e.target.value })}
            className="text-base font-semibold bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            placeholder="Nome do Squad"
          />
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-secondary text-muted-foreground text-xs font-medium border border-border">
          Draft
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleSalvar}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
        >
          <Save className="w-4 h-4" />
          Salvar
        </button>
        <button
          onClick={handleExecutar}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Play className="w-4 h-4" />
          Executar Squad
        </button>
        <button className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
