import type { ColumnInfoType } from "../pages/event/eventdetailpages/tiesheet";

const extractToShowColumn = (columns: ColumnInfoType[]) => {
  return columns.find(c => c.to_show === "True");
};

export default extractToShowColumn;
