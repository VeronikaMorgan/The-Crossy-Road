import { RowBase } from "@/_components/Map/_components/RowBase";
import { Row } from "./_components/Row";
import { useMapStore } from "@/stores/mapStore";

export const Map = () => {
  const { rows } = useMapStore();
  
  const initialGrassRows = Array.from({ length: 9 }, (_, i) => i - 8);
  
  return (
    <>
      {initialGrassRows.map((rowIndex) => (
        <RowBase key={rowIndex} rowIndex={rowIndex} type="grass" />
      ))}
      {rows.map((row, index) => (
        <Row key={index} rowIndex={index + 1} rowData={row} />
      ))}
    </>
  );
};
