import { useState } from "react"
import type { Round } from "../../type/group.type"

export const useTiesheetForm = () => {
    // Options for status Options
    const statusOptions = [
        { label: "Scheduled", value: "scheduled" },
        { label: "Completed", value: "completed" },
        { label : "Ongoing", value : "ongoing"}
    ] as const
}