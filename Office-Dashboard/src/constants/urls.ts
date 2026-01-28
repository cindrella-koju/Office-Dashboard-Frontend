const BASE_URL = "http://127.0.0.1:8000"

export const CREATE_EVENT = `${BASE_URL}/event`
export const UPDATE_EVENT = (eventId: string) => `${BASE_URL}/event?event_id=${eventId}`
export const RETRIEVE_EVENT = `${BASE_URL}/event`
export const RETRIEVE_GROUP_AND_MEMBERS = `${BASE_URL}/event/group`

// API for Group
export const CREATE_GROUP = `${BASE_URL}/event/group`
export const UPDATE_GROUP = (groupId: string) => `${BASE_URL}/event/group/${groupId}`
export const DELETE_GROUP = (groupId: string) => `${BASE_URL}/event/group/${groupId}`
export const UPDATE_GROUP_TABLE = (groupId: string) => `${BASE_URL}/event/group/${groupId}/members`
export const DELETE_GROUP_MEMBER = (userId: string, groupId: string) => `${BASE_URL}/event/group/member/${userId}/group/${groupId}`
export const ADD_GROUP_MEMBER = `${BASE_URL}/event/group/player`

// Api to extract group and participants
export const  GET_ROUNDS_BY_EVENT = (eventId: string) => `${BASE_URL}/event/stage/rounds?event_id=${eventId}`
export const GET_PARTICIPANTS_BY_EVENT = (eventId: string) => `${BASE_URL}/participant/not-in-group?event_id=${eventId}` 
export const GET_QUALIFIER_NOT_IN_GROUP = (eventId:string, roundId:string) => `${BASE_URL}/participant/not-in-group/event/${eventId}/stage/${roundId}` 
export const RETRIEVE_GROUP_BY_ROUND = (roundId : string) => `${BASE_URL}/event/group/info/${roundId}` 
export const RETRIEVE_QUALIFIER_BY_ROUND = (roundId :  string ) => `${BASE_URL}/event/qualifier?stage_id=${roundId}`
export const RETRIEVE_USER_PARTICIPANT_NOT_IN_QUALIFIER = (eventId:string, roundId : string) =>  `${BASE_URL}/participant/not_qualifier?stage_id=${roundId}&event_id=${eventId}`

export const RETRIEVE_TIESHEET = (eventId : string) => `${BASE_URL}/event/tiesheet?event_id=${eventId}`
export const CREATE_TIESHEET = `${BASE_URL}/event/tiesheet`

export const RETRIEVE_ROUNDS = (eventId : string) => `${BASE_URL}/event/stage?event_id=${eventId}`
export const CREATE_ROUND = (eventId : string) => `${BASE_URL}/event/stage?event_id=${eventId}`
export const EDIT_ROUND = (stageId : string) => `${BASE_URL}/event/stage?stage_id=${stageId}`

export const RETRIEVE_PARTICIPANTS = (eventId : string) => `${BASE_URL}/participant?event_id=${eventId}`
export const RETEIEVE_NOT_PARTICIPANTS = (eventId : string) => `${BASE_URL}/participant/not-participants?event_id=${eventId}`
export const ADD_PARTICIPANTS = (eventID : string) =>  `${BASE_URL}/participant?event_id=${eventID}`

export const ADD_QUALIFIER = (eventId:string,roundId:string) =>`${BASE_URL}/event/qualifier?event_id=${eventId}&stage_id=${roundId}`
export const RETRIEVE_QUALIFIER_BY_EVENT = (eventId : string) => `${BASE_URL}/event/qualifier/event?event_id=${eventId}`

// export const RETRIEVE_OVERALL_TIESHEET = (eventId : string, roundId:string) => `${BASE_URL}/event/overalltiesheet?event_id=${eventId}&stage_id=${roundId}`
export const RETRIEVE_OVERALL_TIESHEET = (eventId : string) => `${BASE_URL}/event/overalltiesheet?event_id=${eventId}`

export const RETRIEVE_STANDING_COLUMN = (roundId : string ) => `${BASE_URL}/event/column?stage_id=${roundId}`
export const ADD_STANDING_COLUMN = `${BASE_URL}/event/column`
export const EDIT_STANDING_COLUMN = (column_id : string) => `${BASE_URL}/event/column/${column_id}`


export const RETRIEVE_USERS = `${BASE_URL}/user`
export const CREATE_USER = `${BASE_URL}/user/signup`
export const UPDATE_USER = (user_id : string ) =>`${BASE_URL}/user?user_id=${user_id}`