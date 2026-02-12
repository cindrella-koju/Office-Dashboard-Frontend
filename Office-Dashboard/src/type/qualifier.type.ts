export interface EachQualifier {
    user_id: number;
    username: string;
}

export interface QualifierResponse {
    round_name: string;
    qualifier: EachQualifier[];
}

export interface Participant {
  user_id: string
  username: string
}

export interface QualifierPayload{
    user_id : string[]
}