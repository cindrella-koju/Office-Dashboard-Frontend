import { useState } from "react";

export const useGroupForm = () => {
    const [formData, setFormData] = useState({
        group_name: "",
        round_id: "",
        participant_ids: [] as string[],
      });
}