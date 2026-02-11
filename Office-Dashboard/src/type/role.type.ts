interface RolePermission{
    id : string,
    rolename : string,
    can_edit_roles : string,
    can_create_roles : string,
    can_delete_roles : string,
}

interface UserPermission{
    id : string,
    rolename : string,
    can_edit_users : string,
    can_create_users : string,
    can_delete_users : string,
}

interface EventPermission{
    id : string,
    rolename : string,
    can_edit_events : string,
    can_create_events : string,
    can_delete_events : string,
}

interface WithinEventPermission{
    id : string,
    rolename : string,
    can_edit : string,
    can_create : string,
    can_delete : string,
}

interface RoleAccessPage {
    home_page: string,
    event_page: string,
    user_page: string,
    profile_page: string,
    role_page: string,
    tiesheet_page: string,
    group_page: string,
    round_config_page: string,
    qualifier_page: string,
    participants_page: string,
    column_config_page: string,
    group_stage_standing_page: string,
    todays_game_page: string
}
interface PagePermission{
    id : string,
    rolename : string,
    roleaccesspage : RoleAccessPage
}

export type selectPermsission = RolePermission | UserPermission | EventPermission | WithinEventPermission | PagePermission

export interface RoleFormType{
    rolename: string,
    can_edit: boolean,
    can_create: boolean,
    can_delete: boolean,
    can_edit_events: boolean,
    can_create_events: boolean,
    can_delete_events: boolean,
    can_edit_users: boolean,
    can_create_users: boolean,
    can_delete_users: boolean,
    can_edit_roles: boolean,
    can_create_roles: boolean,
    can_delete_roles: boolean,
    roleaccessdetail: RoleAccessDetailType
}

interface RoleAccessDetailType{
    home_page: boolean,
    event_page: boolean,
    user_page: boolean,
    profile_page: boolean,
    role_page: boolean,
    tiesheet_page: boolean,
    group_page: boolean,
    round_config_page: boolean,
    qualifier_page: boolean,
    participants_page: boolean,
    column_config_page: boolean,
    group_stage_standing_page: boolean,
    todays_game_page: boolean,
}