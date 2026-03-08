import React, { createContext, useContext, useState, useCallback } from 'react';
import { Agent, Squad } from '@/types/squad';

type SquadContextType = {
  squad: Squad;
  selectedAgentId: string | null;
  setSelectedAgentId: (id: string | null) => void;
  addAgent: (parentId: string | null) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  removeAgent: (id: string) => void;
  updateSquad: (updates: Partial<Pick<Squad, 'name' | 'description'>>) => void;
  getMainAgents: () => Agent[];
  getSubAgents: (parentId: string) => Agent[];
  getSelectedAgent: () => Agent | undefined;
};

const AGENT_COLORS = [
  'hsl(262, 83%, 38%)',
  'hsl(210, 100%, 45%)',
  'hsl(152, 69%, 35%)',
  'hsl(38, 92%, 45%)',
  'hsl(340, 82%, 45%)',
  'hsl(180, 60%, 40%)',
  'hsl(30, 90%, 50%)',
  'hsl(280, 60%, 50%)',
];

let colorIndex = 0;
const getNextColor = () => {
  const color = AGENT_COLORS[colorIndex % AGENT_COLORS.length];
  colorIndex++;
  return color;
};

const defaultSquad: Squad = {
  id: 'squad-1',
  name: 'Meu Primeiro Squad',
  description: 'Configure seus agentes de IA para trabalhar em equipe',
  agents: [],
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

const SquadContext = createContext<SquadContextType | null>(null);

export function SquadProvider({ children }: { children: React.ReactNode }) {
  const [squad, setSquad] = useState<Squad>(defaultSquad);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const addAgent = useCallback((parentId: string | null) => {
    const id = `agent-${Date.now()}`;
    const isMain = parentId === null;
    const newAgent: Agent = {
      id,
      name: isMain ? 'Novo Agente' : 'Novo Subagente',
      role: isMain ? 'coordinator' : 'researcher',
      roleLabel: isMain ? 'Coordenador' : 'Pesquisador',
      llmModelId: isMain ? 'claude-3.5-sonnet' : 'gpt-4o-mini',
      systemPrompt: '',
      flowType: isMain ? 'delegate' : 'report',
      parentId,
      color: isMain ? getNextColor() : getNextColor(),
      createdAt: Date.now(),
    };
    setSquad(prev => ({
      ...prev,
      agents: [...prev.agents, newAgent],
      updatedAt: Date.now(),
    }));
    setSelectedAgentId(id);
  }, []);

  const updateAgent = useCallback((id: string, updates: Partial<Agent>) => {
    setSquad(prev => ({
      ...prev,
      agents: prev.agents.map(a => a.id === id ? { ...a, ...updates } : a),
      updatedAt: Date.now(),
    }));
  }, []);

  const removeAgent = useCallback((id: string) => {
    setSquad(prev => ({
      ...prev,
      agents: prev.agents.filter(a => a.id !== id && a.parentId !== id),
      updatedAt: Date.now(),
    }));
    setSelectedAgentId(prev => prev === id ? null : prev);
  }, []);

  const updateSquad = useCallback((updates: Partial<Pick<Squad, 'name' | 'description'>>) => {
    setSquad(prev => ({ ...prev, ...updates, updatedAt: Date.now() }));
  }, []);

  const getMainAgents = useCallback(() => {
    return squad.agents.filter(a => a.parentId === null);
  }, [squad.agents]);

  const getSubAgents = useCallback((parentId: string) => {
    return squad.agents.filter(a => a.parentId === parentId);
  }, [squad.agents]);

  const getSelectedAgent = useCallback(() => {
    return squad.agents.find(a => a.id === selectedAgentId);
  }, [squad.agents, selectedAgentId]);

  return (
    <SquadContext.Provider value={{
      squad,
      selectedAgentId,
      setSelectedAgentId,
      addAgent,
      updateAgent,
      removeAgent,
      updateSquad,
      getMainAgents,
      getSubAgents,
      getSelectedAgent,
    }}>
      {children}
    </SquadContext.Provider>
  );
}

export function useSquad() {
  const ctx = useContext(SquadContext);
  if (!ctx) throw new Error('useSquad must be used within SquadProvider');
  return ctx;
}
