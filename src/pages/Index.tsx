import { SquadProvider } from '@/contexts/SquadContext';
import { NestSidebar } from '@/components/nest/NestSidebar';
import { NestHeader } from '@/components/nest/NestHeader';
import { HierarchyCanvas } from '@/components/nest/HierarchyCanvas';
import { AgentConfigPanel } from '@/components/nest/AgentConfigPanel';
import { IPhoneFrame } from '@/components/mobile/IPhoneFrame';
import { MobileSquadApp } from '@/components/mobile/MobileSquadApp';

const Index = () => {
  return (
    <SquadProvider>
      <div className="min-h-screen bg-secondary">
        {/* Desktop Version */}
        <div className="flex w-full overflow-hidden" style={{ height: '100vh' }}>
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

        {/* Mobile Version */}
        <div className="py-20 px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Versão Mobile</h2>
            <p className="text-sm text-muted-foreground mt-2">iPhone 16 · 393 × 852pt</p>
          </div>

          <div className="flex justify-center">
            <IPhoneFrame>
              <MobileSquadApp />
            </IPhoneFrame>
          </div>
        </div>
      </div>
    </SquadProvider>
  );
};

export default Index;
