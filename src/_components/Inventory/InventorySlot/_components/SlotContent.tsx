import { twMerge } from "tailwind-merge";
import { getEffectTimeLeft } from "../utils";

type SlotContentProps = {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  iconColor: string;
  count: number;
  effectExpiresAt?: number;
};

export const SlotContent = ({
  icon: Icon,
  iconColor,
  count,
  effectExpiresAt,
}: SlotContentProps) => {
  return (
    <>
      <Icon className={twMerge("shrink-0", iconColor)} size={26} />
      {count > 0 && (
        <span className="min-w-[20px] text-center tabular-nums">{count}</span>
      )}
      {effectExpiresAt !== undefined && (
        <span className="text-xs font-semibold opacity-90">
          {getEffectTimeLeft(effectExpiresAt)}с
        </span>
      )}
    </>
  );
};
