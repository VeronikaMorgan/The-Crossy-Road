import { InventorySlot } from "@/_components/Inventory/InventorySlot";
import { useInventoryStore } from "@/stores/inventoryStore";
import type { ItemType } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { FaShieldHeart, FaClock, FaBolt } from "react-icons/fa6";

const TICK_INTERVAL_MS = 500;

const INVENTORY_CONFIG = [
  { icon: FaShieldHeart, label: "Щит", color: "text-green", type: "shield" },
  { icon: FaClock, label: "Часы", color: "text-blue", type: "clock" },
  {
    icon: FaBolt,
    label: "Прыжок (Space)",
    color: "text-yellow",
    type: "lightning",
  },
] as const;

function countByType(items: ItemType[]): Record<ItemType, number> {
  return items.reduce((acc, type) => {
    acc[type] = (acc[type] ?? 0) + 1;
    return acc;
  }, {} as Record<ItemType, number>);
}

export const Inventory = () => {
  const items = useInventoryStore((s) => s.items);
  const activeEffects = useInventoryStore((s) => s.activeEffects);
  const useItem = useInventoryStore((s) => s.useItem);
  const tickEffects = useInventoryStore((s) => s.tickEffects);
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      tickEffects();
      setTick((t) => t + 1);
    }, TICK_INTERVAL_MS);
    return () => clearInterval(id);
  }, [tickEffects]);

  const itemCounts = useMemo(() => countByType(items), [items]);

  return (
    <div className="absolute top-4 left-4 flex flex-col gap-3">
      <div className="text-black font-bold text-sm">Инвентарь</div>
      <div className="flex flex-wrap gap-2">
        {INVENTORY_CONFIG.map((item) => (
          <InventorySlot
            key={item.type}
            config={item}
            count={itemCounts[item.type] ?? 0}
            effect={activeEffects.find((e) => e.type === item.type)}
            onUse={useItem}
          />
        ))}
      </div>
    </div>
  );
};
