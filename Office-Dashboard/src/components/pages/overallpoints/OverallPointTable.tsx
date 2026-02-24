import type { OverAllPointsTableProps } from "../../../type/overallpoint.type";
import Table from "../../table/Tables"
import EmptyMessage from "../../ui/EmptyMessage"


export default function OverallPointTable({ users, tablehead }: OverAllPointsTableProps) {
  if (!users || users.length === 0) {
    return (
      <EmptyMessage message="No Overall Points yet"/>
    );
  }
  console.log("USers:", users)

  return (
    <Table
      tablehead={tablehead}
      tabledata={users}
      setModelType={() => {}}
      setValue={() => {}}
      tablefor={null}
    />
  );
}
