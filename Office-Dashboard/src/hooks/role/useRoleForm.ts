import { useEffect, useState } from "react"
import { type RolePayload } from "../../services/role.service"

const defaultState: RolePayload = {
  rolename: "",
  can_edit: false,
  can_create: false,
  can_delete: false,
  can_edit_events: false,
  can_create_events: false,
  can_delete_events: false,
  can_edit_users: false,
  can_create_users: false,
  can_delete_users: false,
  can_edit_roles: false,
  can_create_roles: false,
  can_delete_roles: false,
  roleaccessdetail: {
    home_page: false,
    event_page: false,
    user_page: false,
    profile_page: false,
    role_page: false,
    tiesheet_page: false,
    group_page: false,
    round_config_page: false,
    qualifier_page: false,
    participants_page: false,
    column_config_page: false,
    group_stage_standing_page: false,
    todays_game_page: false,
  },
}

export function useRoleForm( eachdetail?: any) {
  const [permissionDetail, setPermissionDetail] =
    useState<RolePayload>(defaultState)

  useEffect(() => {
    if (eachdetail) {
      setPermissionDetail({
        ...defaultState,
        ...eachdetail,
        roleaccessdetail: {
          ...defaultState.roleaccessdetail,
          ...eachdetail.roleaccesspage,
        },
      })
    }
  }, [eachdetail])

  const handleBoolValue = (
    id: string,
    boolFor: string,
    checked: boolean
  ) => {
    if (id === "event" || id === "user" || id === "role") {
      setPermissionDetail((prev) => ({
        ...prev,
        [`can_${boolFor}_${id}s`]: checked,
      }))
      return
    }

    if (id === "within_event") {
      setPermissionDetail((prev) => ({
        ...prev,
        [`can_${boolFor}`]: checked,
      }))
      return
    }

    if (id === "page") {
      setPermissionDetail((prev) => ({
        ...prev,
        roleaccessdetail: {
          ...prev.roleaccessdetail,
          [`${boolFor.replace(/ /g, "_")}_page`]: checked,
        },
      }))
    }
  }

  const reset = () => setPermissionDetail(defaultState)

  return {
    permissionDetail,
    setPermissionDetail,
    handleBoolValue,
    // submit,
    reset,
  }
}
