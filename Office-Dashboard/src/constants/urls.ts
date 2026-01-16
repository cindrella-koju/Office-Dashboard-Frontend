const BASE_URL = "http://127.0.0.1:8000"

export const CREATE_EVENT_FORM = `${BASE_URL}/test/createfield?page=event`
export const RETRIEVE_EVENT = `${BASE_URL}/event`
export const RETRIEVE_ROUNDS = `${BASE_URL}/event/stage`
export const RETRIEVE_GROUP_AND_MEMBERS = `${BASE_URL}/event/group`

// API for Group
export const CREATE_GROUP = `${BASE_URL}/event/group`
export const UPDATE_GROUP = (groupId: string) => `${BASE_URL}/event/group/${groupId}`
export const DELETE_GROUP = (groupId: string) => `${BASE_URL}/event/group/${groupId}`
export const UPDATE_GROUP_TABLE = (groupId: string) => `${BASE_URL}/event/group/${groupId}/members`
export const DELETE_GROUP_MEMBER = (userId: string, groupId: string) => `${BASE_URL}/event/group/member/${userId}/group/${groupId}`
export const ADD_GROUP_MEMBER = `${BASE_URL}/event/group/player`

// Api to extract group and participants
export const GET_ROUNDS_BY_EVENT = (eventId: string) => `${BASE_URL}/event/stage/rounds?event_id=${eventId}`
export const GET_PARTICIPANTS_BY_EVENT = (eventId: string) => `${BASE_URL}/participant/not-in-group?event_id=${eventId}` 
