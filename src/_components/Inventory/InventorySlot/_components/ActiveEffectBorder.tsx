import type { ItemType } from "@/types";

type ActiveEffectBorderProps = {
  itemType: ItemType;
  children: React.ReactNode;
};

export const ActiveEffectBorder = ({
  itemType,
  children,
}: ActiveEffectBorderProps) => {
  return (
    <div className="relative inline-flex shrink-0 rounded-[6px] shadow-[0_3px_0_0_#047857]">
      {children}
      <svg
        className="pointer-events-none absolute inset-0 size-full overflow-visible rounded-[6px]"
        viewBox="0 0 48 48"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <filter
            id={`border-shadow-${itemType}`}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="0"
              floodColor="#047857"
              floodOpacity="0.5"
            />
          </filter>
        </defs>
        <path
          pathLength={1}
          stroke="#25e000"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-border-draw"
          filter={`url(#border-shadow-${itemType})`}
          d="M 3 0 H 42 A 6 6 0 0 1 48 6 V 42 A 6 6 0 0 1 42 48 H 6 A 6 6 0 0 1 0 42 V 6 A 6 6 0 0 1 6 0"
        />
      </svg>
    </div>
  );
};
