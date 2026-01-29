import type { RowDataType } from "@/types";
import { Trees } from "../Trees";
import { TrainRow } from "../TrainRow";
import { VehiclesRow } from "../VehiclesRow";

type RowProps = {
  rowIndex: number;
  rowData: RowDataType;
};

export const Row = ({ rowIndex, rowData }: RowProps) => {
  switch (rowData.type) {
    case "trees":
      return <Trees rowIndex={rowIndex} rowData={rowData} />;
    case "cars":
    case "trucks":
      return <VehiclesRow rowIndex={rowIndex} rowData={rowData} />;
    case "train":
      return <TrainRow rowIndex={rowIndex} rowData={rowData} />;
    default:
      return null;
  }
};

