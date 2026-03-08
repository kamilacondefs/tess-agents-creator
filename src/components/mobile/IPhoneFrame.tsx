import { ReactNode } from 'react';

type IPhoneFrameProps = {
  children: ReactNode;
};

export function IPhoneFrame({ children }: IPhoneFrameProps) {
  return (
    <div className="relative mx-auto" style={{ width: '393px', height: '852px' }}>
      {/* Phone outer shell */}
      <div
        className="absolute inset-0 rounded-[55px] bg-[hsl(0,0%,12%)] shadow-2xl"
        style={{
          boxShadow: '0 25px 60px -12px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08) inset',
        }}
      >
        {/* Side button - right (power) */}
        <div className="absolute -right-[3px] top-[180px] w-[3px] h-[80px] bg-[hsl(0,0%,18%)] rounded-r-sm" />
        {/* Side buttons - left (volume + silent) */}
        <div className="absolute -left-[3px] top-[140px] w-[3px] h-[32px] bg-[hsl(0,0%,18%)] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[195px] w-[3px] h-[55px] bg-[hsl(0,0%,18%)] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[260px] w-[3px] h-[55px] bg-[hsl(0,0%,18%)] rounded-l-sm" />

        {/* Screen area */}
        <div className="absolute inset-[4px] rounded-[51px] overflow-hidden bg-background">
          {/* Dynamic Island */}
          <div className="absolute top-[12px] left-1/2 -translate-x-1/2 z-50">
            <div
              className="bg-black rounded-[20px] flex items-center justify-center"
              style={{ width: '126px', height: '37px' }}
            >
              {/* Camera dot */}
              <div className="w-[12px] h-[12px] rounded-full bg-[hsl(0,0%,8%)] ml-auto mr-4 ring-1 ring-[hsl(0,0%,15%)]" />
            </div>
          </div>

          {/* iOS Status Bar */}
          <div className="absolute top-0 left-0 right-0 z-40 h-[54px] flex items-end justify-between px-8 pb-1">
            {/* Time */}
            <span className="text-[15px] font-semibold text-foreground tracking-tight" style={{ fontFeatureSettings: '"tnum"' }}>
              9:41
            </span>

            {/* Status icons */}
            <div className="flex items-center gap-[5px]">
              {/* Signal bars */}
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                <rect x="0" y="8" width="3" height="4" rx="0.5" fill="currentColor" className="text-foreground" />
                <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" fill="currentColor" className="text-foreground" />
                <rect x="9" y="3" width="3" height="9" rx="0.5" fill="currentColor" className="text-foreground" />
                <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="currentColor" className="text-foreground" />
              </svg>
              {/* WiFi */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M8 3.6C10.1 3.6 12 4.4 13.4 5.7L14.8 4.3C13 2.6 10.6 1.6 8 1.6C5.4 1.6 3 2.6 1.2 4.3L2.6 5.7C4 4.4 5.9 3.6 8 3.6Z" fill="currentColor" className="text-foreground" />
                <path d="M8 7.6C9.2 7.6 10.3 8.1 11.1 8.9L12.5 7.5C11.3 6.3 9.7 5.6 8 5.6C6.3 5.6 4.7 6.3 3.5 7.5L4.9 8.9C5.7 8.1 6.8 7.6 8 7.6Z" fill="currentColor" className="text-foreground" />
                <circle cx="8" cy="11" r="1.2" fill="currentColor" className="text-foreground" />
              </svg>
              {/* Battery */}
              <div className="flex items-center gap-[2px]">
                <div className="relative w-[25px] h-[12px] rounded-[3px] border border-foreground/40">
                  <div className="absolute inset-[2px] right-[3px] rounded-[1.5px] bg-foreground" />
                </div>
                <div className="w-[1.5px] h-[5px] rounded-r-sm bg-foreground/40" />
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="absolute top-[54px] left-0 right-0 bottom-[34px] overflow-hidden">
            {children}
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 z-40">
            <div className="w-[134px] h-[5px] rounded-full bg-foreground/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
