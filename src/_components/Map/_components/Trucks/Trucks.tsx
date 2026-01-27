import type { TrucksRowType } from "@/types";
import { RowBase } from "../RowBase";
import { Truck } from "./_components/Truck";

type TrucksProps = {
  rowIndex: number;
  rowData: TrucksRowType;
};

export const Trucks = ({ rowIndex, rowData }: TrucksProps) => {
  const { direction, speed } = rowData;
  return (
    <RowBase rowIndex={rowIndex} type="road">
      {rowData.vehicles.map(({ initialTileIndex, color }) => (
        <Truck
          key={initialTileIndex}
          initialTileIndex={initialTileIndex}
          color={color}
          direction={direction}
          speed={speed}
          rowIndex={rowIndex}
        />
      ))}
    </RowBase>
  );
};
