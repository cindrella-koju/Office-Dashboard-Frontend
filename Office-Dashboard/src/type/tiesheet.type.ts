export interface ColumnInfoType{
    column_field : string,
    value : string,
    to_show : string
}

export interface TiesheetType{
  id : string,
  scheduled_date : string,
  scheduled_time : string,
  stage_id : string,
  stage_name : string,
  status : "scheduled" | "completed",
  player_info : PlayerInfoType[]
//   group_name : string | null
}

export interface ColumnType {
  column_field : string;
  value: string;
  to_show : string
}

export interface PlayerInfoType{
  user_id : string,
  is_winner : boolean,
  username : string,
  columns : ColumnType[]
}

// export interface TiesheetType{
//   id : string,
//   scheduled_date : string,
//   scheduled_time : string,
//   stage_name : string,
//   status: 'scheduled' | 'completed',
//   player_info : PlayerInfoType[]
//   group_name : string | null
// }
