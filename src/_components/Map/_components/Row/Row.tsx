import type { RowDataType } from "@/types";
import { Trees } from "../Trees";
import { Cars } from "../Cars";
import { Trucks } from "../Trucks";

type RowProps = {
    rowIndex: number;
    rowData: RowDataType;
}

export const Row = ({ rowIndex, rowData }: RowProps) => {
  switch (rowData.type) {
    case 'trees':
      return <Trees rowIndex={rowIndex} rowData={rowData} />;
    case 'cars':
      return <Cars rowIndex={rowIndex} rowData={rowData} />;
    case 'trucks':
      return <Trucks rowIndex={rowIndex} rowData={rowData} />;
    default:
      return null;
  }
};

