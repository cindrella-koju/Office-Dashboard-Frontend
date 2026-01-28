import Table from "../../Tables"
import EmptyMessage from "../../ui/EmptyMessage"

interface OverAllPointsTableProps{
    users : UserType[]

}

export interface UserType{
    user_id : string
    username : string
    column_detail : ColumnType[]
}

interface ColumnType{
    column_name : string,
    column_value : string
}

export default function OverallPointTable({ users }: OverAllPointsTableProps) {

  if (!users || users.length === 0) {
    return (
      <EmptyMessage message="No Overall Points yet"/>
    );
  }

//   Extract Table head
  const tablehead: string[] = [
    "username",
    ...users[0].column_detail.map(col => col.column_name),
  ];

//   Creating Table data
  const tabledata = users.map(user => {
    const row: Record<string, any> = {
      id: user.user_id,
      username: user.username,
    };

    user.column_detail.forEach(col => {
      row[col.column_name] = col.column_value;
    });

    return row;
  });

  return (
    <Table
      tablehead={tablehead}
      tabledata={tabledata}
      permissions={{
        canView: false,
        canEdit: false,
        canDelete: false,
        canEditByOwn : false,
        canCreate : false
      }}
      setModelType={() => {}}
      setValue={() => {}}
    />
  );
}
