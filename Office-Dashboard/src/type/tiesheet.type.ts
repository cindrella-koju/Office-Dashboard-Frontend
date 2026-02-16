import type { Dispatch, SetStateAction } from "react";
import type { ModelType } from "./main.type";
import type { EventPermission } from "../hooks/userPermission";

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
}

export interface AddMatchProps{
  status : string,
  overallwinner : string,
  tiesheet_id : string,
  matchDetail : MatchDetail[]
}

export interface AddMatchResponse{
  status : string,
  overallwinner : string | null,
  matchDetail : MatchDetail[]
}

export interface MatchDetail{
  match_id? : string,
  match_name : string,
  userDetail : UserDetail[]
}

export interface UserDetail{
  user_id : string,
  points : string,
  winner : boolean
}

export interface AddMatchModalProps {
  players: PlayerInfoType[];
  // player2: PlayerInfoType;
  tiesheetID: string;
  setOpenStartGame: Dispatch<SetStateAction<ModelType>>;
  scoreView : ModelType;
  status : string;
  setScoreView : Dispatch<SetStateAction<ModelType>>;
  setDeleteMatchId : Dispatch<SetStateAction<string | undefined>>;
  setShowDeleteMatch : Dispatch<SetStateAction<boolean>>;
}

export interface MatchHeaderProps {
  groupName?: string | null;
  matchTime: string;
  status: "scheduled" | "completed" | "ongoing";
  onEdit?: () => void;
  onEditScore?: () => void;
  onAddScore? :() => void;
  permissions: EventPermission;
  tiesheetId: string;
  player1: PlayerInfoType;
  player2: PlayerInfoType;
  player3? : PlayerInfoType;
  player4? : PlayerInfoType;
  onClick : () => void;
  onDeleteTiesheet : () => void;
}