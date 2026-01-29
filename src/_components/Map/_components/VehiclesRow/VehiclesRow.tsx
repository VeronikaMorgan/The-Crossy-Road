import type { VericlesRowDataType } from "@/types";
import { RowBase } from "@/ui/RowBase";
import { Truck } from "./_components/Truck";
import { Car } from "./_components/Car";

type VehiclesRowProps = {
  rowIndex: number;
  rowData: VericlesRowDataType;
};

export const VehiclesRow = ({
  rowIndex,
  rowData,
}: VehiclesRowProps) => {
  const { direction, speed } = rowData;
  return (
    <RowBase rowIndex={rowIndex} type="road">
      {rowData.vehicles.map(({ initialTileIndex, color }) =>
        rowData.type === "trucks" ? (
          <Truck
            key={initialTileIndex}
            initialTileIndex={initialTileIndex}
            color={color}
            direction={direction}
            speed={speed}
            rowIndex={rowIndex}
          />
        ) : (
          <Car
            key={initialTileIndex}
            initialTileIndex={initialTileIndex}
            color={color}
            direction={direction}
            speed={speed}
            rowIndex={rowIndex}
          />
        ),
      )}
    </RowBase>
  );
};
