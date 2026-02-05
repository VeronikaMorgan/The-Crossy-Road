import type { ItemType } from "@/types";
import { twMerge } from "tailwind-merge";
import { Button } from "@/ui/Button";
import { ActiveEffectBorder } from "./_components/ActiveEffectBorder";
import { SlotContent } from "./_components/SlotContent";

const EFFECT_BUTTON_CLASS =
  "!border-0 !rounded-[6px] !shadow-none disabled:!shadow-none";

export type InventorySlotConfig = {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
  color: string;
  type: ItemType;
};

export type InventorySlotProps = {
  config: InventorySlotConfig;
  count: number;
  effect: { expiresAt: number } | undefined;
  onUse: (type: ItemType) => void;
};

export const InventorySlot = ({
  config,
  count,
  effect,
  onUse,
}: InventorySlotProps) => {
  const isDisabled = count === 0 || !!effect;

  const button = (
    <Button
      onClick={() => onUse(config.type)}
      disabled={isDisabled}
      className={twMerge('min-w-[96px] h-[48px]', effect ? EFFECT_BUTTON_CLASS : undefined)
      }
      title={config.label}
    >
      <SlotContent
        icon={config.icon}
        iconColor={config.color}
        count={count}
        effectExpiresAt={effect?.expiresAt}
      />
    </Button>
  );

  if (effect) {
    return (
      <ActiveEffectBorder itemType={config.type}>{button}</ActiveEffectBorder>
    );
  }

  return button;
};
