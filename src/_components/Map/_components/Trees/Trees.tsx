import type { TreesRowType } from "@/types";
import { Item } from "./_components/Item";
import { Tree } from "./_components/Tree";
import { RowBase } from "@/ui/RowBase";

type TreesProps = {
    rowIndex: number;
    rowData: TreesRowType;
}

export const Trees = ({ rowIndex, rowData }: TreesProps) => {
  return (
    <RowBase rowIndex={rowIndex} type="grass">
      {rowData.trees.map((tree) => (
        <Tree key={tree.tileIndex} tileIndex={tree.tileIndex} height={tree.height} type={tree.type} />
      ))}
      {rowData.item && (
        <Item
          tileIndex={rowData.item.tileIndex}
          type={rowData.item.type}
          rowIndex={rowIndex}
        />
      )}
    </RowBase>
  );
};