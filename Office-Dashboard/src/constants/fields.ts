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