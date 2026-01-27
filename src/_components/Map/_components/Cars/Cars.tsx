import type { CarsRowType } from "@/types";
import { RowBase } from "../RowBase";
import { Car } from "./_components/Car";

type CarsProps = {
  rowIndex: number;
  rowData: CarsRowType;
};

export const Cars = ({ rowIndex, rowData }: CarsProps) => {
  const { direction, speed } = rowData;
  return (
    <RowBase rowIndex={rowIndex} type="road">
      {rowData.vehicles.map(({ initialTileIndex, color }) => (
        <Car
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
