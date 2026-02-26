const BASE_URL = "http://127.0.0.1:8000"

export const SIGNUP = `${BASE_URL}/user/signup`
export const LOGIN = `${BASE_URL}/user/login`
export const REFRESH_TOKEN = `${BASE_URL}/user/refresh`


export const CREATE_EVENT = `${BASE_URL}/event`
export const UPDATE_EVENT = (eventId: string) => `${BASE_URL}/event?event_id=${eventId}`
export const DELETE_EVENT = (eventId: string) => `${BASE_URL}/event/${eventId}`
export const RETRIEVE_EVENT = (page : number, limit : number) => `${BASE_URL}/event?page=${page}&limit=${limit}`
export const RETRIEVE_EVENT_BY_STATUS = (status : string,page : number, limit : number) => `${BASE_URL}/event?status=${status}&page=${page}&limit=${limit}`
export const RETRIEVE_GROUP_AND_MEMBERS  = (eventId: string ) => `${BASE_URL}/event/group/event/${eventId}`
export const RETRIEVE_GROUP_AND_MEMBERS_WITH_ROUND  = (eventId: string, stageId: string ) => `${BASE_URL}/event/group/event/${eventId}?stage_id=${stageId}`

// API for Group
export const CREATE_GROUP = (eventId : string) => `${BASE_URL}/event/group?event_id=${eventId}`
export const UPDATE_GROUP = (groupId: string, stageId : string) => `${BASE_URL}/event/group/${groupId}/stage/${stageId}`
export const DELETE_GROUP = (groupId: string) => `${BASE_URL}/event/group/${groupId}`
export const UPDATE_GROUP_TABLE = (groupId: string) => `${BASE_URL}/event/group/${groupId}/members`
export const DELETE_GROUP_MEMBER = (userId: string, groupId: string, stageId : string) => `${BASE_URL}/event/group/member/${userId}/group/${groupId}/stage/${stageId}`
export const ADD_GROUP_MEMBER = `${BASE_URL}/event/group/player`

// Api to extract group and participants
export const  GET_ROUNDS_BY_EVENT = (eventId: string) => `${BASE_URL}/event/stage/rounds?event_id=${eventId}`
export const  GET_ROUNDS_BY_EVENT_WITH_COLUMN = (eventId: string) => `${BASE_URL}/event/stage/rounds/standingcolumn?event_id=${eventId}`
export const GET_ROUNDS_HAVING_GROUP = (eventID : string) => `${BASE_URL}/event/stage/group/${eventID}`
export const GET_PARTICIPANTS_BY_EVENT = (eventId: string) => `${BASE_URL}/participant/not-in-group?event_id=${eventId}` 
export const GET_QUALIFIER_NOT_IN_GROUP = (eventId:string, roundId:string) => `${BASE_URL}/participant/not-in-group/event/${eventId}/stage/${roundId}` 
export const GET_QUALIFIER_NOT_IN_GROUP_FOR_EDIT = (eventId:string, roundId:string, groupId : string) => `${BASE_URL}/participant/not-in-group/event/${eventId}/stage/${roundId}?group_id=${groupId}` 
export const RETRIEVE_GROUP_BY_ROUND = (roundId : string) => `${BASE_URL}/event/group/info/${roundId}` 
export const RETRIEVE_QUALIFIER_BY_ROUND = (roundId :  string ) => `${BASE_URL}/event/qualifier?stage_id=${roundId}`
export const RETRIEVE_USER_PARTICIPANT_NOT_IN_QUALIFIER = (eventId:string, roundId : string) =>  `${BASE_URL}/participant/not_qualifier?stage_id=${roundId}&event_id=${eventId}`

export const RETRIEVE_TODAY_TIESHEET = (eventId : string) => `${BASE_URL}/event/tiesheet?event_id=${eventId}&today=true`
export const RETRIEVE_TIESHEET = (eventId : string) => `${BASE_URL}/event/tiesheet?event_id=${eventId}`
export const RETRIEVE_TIESHEET_BY_STAGE = (eventId : string, stageId : string) => `${BASE_URL}/event/tiesheet?event_id=${eventId}&stage_id=${stageId}`

export const CREATE_TIESHEET = `${BASE_URL}/event/tiesheet`
export const DELETE_TIESHEET = (tiesheetId : string) => `${BASE_URL}/event/tiesheet/${tiesheetId}`
export const GET_TIESHEET_BY_ID = (tiesheetId: string) => `${BASE_URL}/event/tiesheet/${tiesheetId}`
export const UPDATE_TIESHEET = (tiesheetId: string) => `${BASE_URL}/event/tiesheet/${tiesheetId}`

export const RETRIEVE_ROUNDS = (eventId : string) => `${BASE_URL}/event/stage?event_id=${eventId}`
export const CREATE_ROUND = (eventId : string) => `${BASE_URL}/event/stage?event_id=${eventId}`
export const EDIT_ROUND = (stageId : string) => `${BASE_URL}/event/stage/${stageId}`
export const DELETE_ROUND = (stageId : string) => `${BASE_URL}/event/stage/${stageId}`

export const RETRIEVE_PARTICIPANTS = (eventId : string) => `${BASE_URL}/participant?event_id=${eventId}`
export const RETRIEVE_NOT_PARTICIPANTS = (eventId : string) => `${BASE_URL}/participant/not-participants?event_id=${eventId}`
export const ADD_PARTICIPANTS = (eventID : string) =>  `${BASE_URL}/participant?event_id=${eventID}`
export const DELETE_PARTICIPANTS = (eventId: string, userId:string) => `${BASE_URL}/participant/${userId}/event/${eventId}`

export const ADD_QUALIFIER = (eventId:string,roundId:string) =>`${BASE_URL}/event/qualifier?event_id=${eventId}&stage_id=${roundId}`
export const RETRIEVE_QUALIFIER_BY_EVENT = (eventId : string) => `${BASE_URL}/event/qualifier/event?event_id=${eventId}`
export const DELETE_QUALIFIER = (qualifierID : string) => `${BASE_URL}/event/qualifier/${qualifierID}`
// export const RETRIEVE_OVERALL_TIESHEET = (eventId : string, roundId:string) => `${BASE_URL}/event/overalltiesheet?event_id=${eventId}&stage_id=${roundId}`
export const RETRIEVE_OVERALL_TIESHEET = (eventId : string,page : number, limit : number) => `${BASE_URL}/event/overalltiesheet?event_id=${eventId}&page=${page}&limit=${limit}`
export const RETRIEVE_OVERALL_TIESHEET_BY_ROUND = (eventId:string, roundId : string,page : number, limit : number) => `${BASE_URL}/event/overalltiesheet?event_id=${eventId}&stage_id=${roundId}&page=${page}&limit=${limit}`

export const RETRIEVE_STANDING_COLUMN = (roundId : string ) => `${BASE_URL}/event/column?stage_id=${roundId}`
export const ADD_STANDING_COLUMN = `${BASE_URL}/event/column`
export const EDIT_STANDING_COLUMN = (column_id : string) => `${BASE_URL}/event/column/${column_id}`


export const RETRIEVE_USERS = (page : number, limit : number) =>`${BASE_URL}/user?page=${page}&limit=${limit}`
export const RETRIEVE_ROLE_ID_NAME_NOT_IN_EVENT = `${BASE_URL}/role/filter?not_in_event=true`
export const RETRIEVE_ROLE_ID_NAME= `${BASE_URL}/role/filter?not_in_event=false`
export const RETRIEVE_ROLE_ID_NAME_IN_EVENT = (eventId : string) => `${BASE_URL}/role/event/${eventId}`
export const RETRIEVE_USERS_BY_ROLE = (role : string, page : number, limit : number  ) => `${BASE_URL}/user?role_id=${role}&page=${page}&limit=${limit}`
export const CREATE_USER = `${BASE_URL}/user/signup`
export const UPDATE_USER = (user_id : string ) =>`${BASE_URL}/user/${user_id}`
export const DELETE_USER = (user_id : string ) =>`${BASE_URL}/user/${user_id}`


export const CREATE_MATCH = `${BASE_URL}/event/match`
export const EDIT_MATCH = `${BASE_URL}/event/match`
export const RETRIEVE_MATCH = (tiesheet_id : string ) =>`${BASE_URL}/event/match/score?tiesheet_id=${tiesheet_id}`
export const RETRIEVE_MATCH_BY_TIESHEET_ID = (tiesheet_id : string) => `${BASE_URL}/event/match/tiesheet/${tiesheet_id}`
export const DELETE_MATCH = (matchId : string) => `${BASE_URL}/event/match/${matchId}`

export const RETRIEVE_GROUP_ID_NAME_BY_ROUND = (round_id : string) => `${BASE_URL}/event/group/byround?round_id=${round_id}`
export const RETRIEVE_GROUP_MEMBER_ID_NAME = ( group_id : string ) => `${BASE_URL}/event/group/member?group_id=${group_id}`

export const RETRIEVE_ROLE_DETAIL = (roleId : string) => `${BASE_URL}/role?role_id=${roleId}`
// export const RETRIEVE_PERMISSION_WITHIN_EVENT = (roleId : string) => `${BASE_URL}/role?role_id=${roleId}`
export const RETRIEVE_PERMISSION_WITHIN_EVENT_BY_USER_ID = (userId: string) => `${BASE_URL}/role/user/${userId}/event`
export const RETRIEVE_PERMISSION_WITHIN_EVENT = (userId: string, eventId:string) => `${BASE_URL}/role/user/${userId}/event?event_id=${eventId}`
export const RETRIEVE_DETAIL_FOR_ROLE_MANAGEMENT = (detailPage : string) => `${BASE_URL}/role/detail?permission_detail=${detailPage}`
export const EDIT_DETAIL_FOR_ROLE_MANAGEMENT = (roleId:string) => `${BASE_URL}/role/${roleId}`
export const DELETE_ROLE = (roleId : string ) => `${BASE_URL}/role/${roleId}`
export const CREATE_ROLE_WITH_PERMISSION = `${BASE_URL}/role`

export const CREATE_EVENT_ROLE = (eventId : string) => `${BASE_URL}/event/role/${eventId}`
export const RETRIEVE_EVENT_ROLE = (eventId: string, page: number, limit: number) => `${BASE_URL}/event/role/${eventId}?page=${page}&limit=${limit}`
export const RETRIEVE_EVENT_ROLE_BY_ROLEID = (eventId: string, roleId : string, page: number, limit: number) => `${BASE_URL}/event/role/${eventId}?role_id=${roleId}&page=${page}&limit=${limit}`
export const EDIT_EVENT_ROLE = (eventRoleId: string) => `${BASE_URL}/event/role/${eventRoleId}`
export const DELETE_EVENT_ROLE = (eventRoleId: string) => `${BASE_URL}/event/role/${eventRoleId}`

// Home page url
export const RETRIEVE_HOME = `${BASE_URL}/user/home`
export const RETRIEVE_RECENT_FIVE_EVENT = `${BASE_URL}/event/recent`

// Profile page url
export const PROFILE_PAGE = `${BASE_URL}/user/profile`
export const CHANGE_PASSWORD = `${BASE_URL}/user/changepassword`

// TiesheetPlayer
export const DELETE_TIESHEET_PLAYER_ID = (tiesheetplayerId: string)  => `${BASE_URL}/event/tiesheet/player/${tiesheetplayerId}`