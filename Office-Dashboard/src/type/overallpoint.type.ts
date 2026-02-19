
export interface OverallPointResponse{
  user_id: string;
  username: string;
  [key: string]: string | number;
}

export interface OverAllPointsTableProps{
    users : OverallPointResponse[],
    tablehead : string[]
}
