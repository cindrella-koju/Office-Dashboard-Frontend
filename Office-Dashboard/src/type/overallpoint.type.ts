
export interface OverallPointResponse{
  page : number,
  limit : number,
  total_pages : number,
  items : userInfo[]
}

export interface userInfo{
  user_id: string;
  username: string;
  [key: string]: string | number;
}
export interface OverAllPointsTableProps{
    users : userInfo[],
    tablehead : string[]
}
