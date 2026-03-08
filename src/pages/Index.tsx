import { SquadProvider } from '@/contexts/SquadContext';
import { NestSidebar } from '@/components/nest/NestSidebar';
import { NestHeader } from '@/components/nest/NestHeader';
import { HierarchyCanvas } from '@/components/nest/HierarchyCanvas';
import { AgentConfigPanel } from '@/components/nest/AgentConfigPanel';

const Index = () => {
  return (
    <SquadProvider>
      <div className="flex h-screen w-screen overflow-hidden" style={{ maxWidth: '1920px', maxHeight: '1080px' }}>
        {/* Left Sidebar */}
        <NestSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <NestHeader />
          <div className="flex-1 flex min-h-0">
            <HierarchyCanvas />
            <AgentConfigPanel />
          </div>
        </div>
      </div>
    </SquadProvider>
  );
};

export default Index;
