import type { TreesRowType } from "@/types";
import { RowBase } from "../RowBase";
import { Tree } from "./_components/Tree";

type TreesProps = {
    rowIndex: number;
    rowData: TreesRowType;
}

export const Trees = ({ rowIndex, rowData }: TreesProps) => {
  return (
    <RowBase rowIndex={rowIndex} type="grass">
      {rowData.trees.map((tree) => (
        <Tree key={tree.tileIndex} tileIndex={tree.tileIndex} height={tree.height} />
      ))}
    </RowBase>
  );
};