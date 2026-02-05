import { SlotContent } from "@/_components/Inventory/InventorySlot/_components/SlotContent";
import { Button } from "@/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/Dialogue";
import { FaShieldHeart, FaClock, FaBolt } from "react-icons/fa6";

const RULES_BEFORE_INVENTORY = [
  "Двигайтесь вперёд по полосам, переходя дороги и рельсы. Цель — дойти как можно дальше.",
  "Управляйте с помощью стрелок на экране или клавиатуры. Прыжок на Пробел.",
  "Избегайте машин, грузовиков и поездов. Столкновение отнимает жизнь. Всего 3 жизни.",
  "После потери жизни есть 5 секунд неуязвимости.",
  "Собирайте предметы на дороге и нажимайте на слот, чтобы использовать.",
];

const EXAMPLE_SLOTS = [
  {
    icon: FaShieldHeart,
    label: "Щит",
    color: "text-green",
    description: "защита от столкновения",
  },
  {
    icon: FaClock,
    label: "Часы",
    color: "text-blue",
    description: "замедляют транспорт",
  },
  {
    icon: FaBolt,
    label: "Прыжок (Space)",
    color: "text-yellow",
    description: "прыжок через препятствие",
  },
] as const;

export const RulesModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="max-w-lg"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-3">
            Правила игры
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
          {RULES_BEFORE_INVENTORY.map((rule, i) => (
            <p key={i} className="leading-relaxed">
              {rule}
            </p>
          ))}
          <ul className="space-y-2 list-none pl-0">
            {EXAMPLE_SLOTS.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 flex-wrap leading-relaxed"
              >
                <Button
                  disabled
                  className="min-w-[48px] h-[48px] shrink-0"
                  title={item.label}
                >
                  <SlotContent
                    icon={item.icon}
                    iconColor={item.color}
                    count={0}
                  />
                </Button>
                <span>— {item.description}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          onClick={() => onOpenChange(false)}
          className="w-full bg-green mt-6 hover:bg-yellow text-white font-semibold rounded-md transition-colors outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          Понятно, начать
        </Button>
      </DialogContent>
    </Dialog>
  );
};
