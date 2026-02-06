import type { FieldProps } from "../type/main.type";


export const userField: FieldProps[] = [
    { label: "Username", name: "username", type: "text", required: true },
    { label: "Fullname", name: "fullname", type: "text", required: true },
    { label: "Email", name: "email", type: "text", required: true },
    {
        label: "Role",
        name: "role",
        type: "select",
        options: ["Admin", "SuperAdmin", "Member"],
    },
    { label: "Password", name: "password", type: "password" },
];

export const eventFields: FieldProps[] = [
    { label: "Event Name", name: "title", type: "text", required: true },
    { label: "Description", name: "description", type: "text" },
    { label: "Start Date", name: "startdate", type: "date", required: true },
    { label: "End Date", name: "enddate", type: "date", required: true },
    {
        label: "Status",
        name: "status",
        type: "select",
        options: ["Draft", "Active", "Completed"],
    },
];

export const editEventFields: FieldProps[] = [
    ...eventFields,
    { label: "Progress Note", name: "progress_note", type: "text" },
];

export const roundFields : FieldProps[] = [
    { label:"Round Name", name:"name", type:"text",required:true },
    { label:"Order Index", name:"round_order", type:"number",required:true },
]

export const RoleFields = [
  {
    id : "user",
    permission_name: "Users",
    permission_type: ["Create", "Edit", "Delete"],
  },
  {
    id: "event",
    permission_name: "Events",
    permission_type: ["Create", "Edit", "Delete"],
  },
  {
    id : "within_event",
    permission_name: "Within Event",
    permission_type: ["Create", "Edit", "Delete"],
  },
  {
    id : "role",
    permission_name: "Roles",
    permission_type: ["Create", "Edit", "Delete"],
  },
  {
    id : "page",
    permission_name: "Pages",
    permission_type: [
      "Home",
      "Event",
      "User",
      "Profile",
      "Role",
      "Timesheet",
      "Group",
      "Round Config",
      "Qualifier",
      "Participants",
      "Column Config",
      "Group Stage Standing",
      "Todays Game",
    ],
  },
];