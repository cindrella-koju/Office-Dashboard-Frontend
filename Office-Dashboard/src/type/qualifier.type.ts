export interface EachQualifier {
    qualifier_id : string
    user_id: string;
    username: string;
}

export interface QualifierResponse {
    // id : string;
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