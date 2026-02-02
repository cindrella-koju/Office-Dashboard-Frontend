import type { ColumnInfoType } from "../type/tiesheet.type";


const extractToShowColumn = (columns: ColumnInfoType[]) => {
  return columns.find(c => c.to_show === "True");
};

export default extractToShowColumn;
