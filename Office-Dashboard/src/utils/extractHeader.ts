export default function extractHeaders(response: any[]): string[] {
  if (!Array.isArray(response) || response.length === 0) {
    return [];
  }
  const excludeKeys = ["id", "created_at", "updated_at","progress_note","stage_id"];
  const allKeys = Object.keys(response[0] as Record<string, any>);
  const headers = allKeys.filter(key => !excludeKeys.includes(key));

  return headers;
}

export function extractPermissionHeaders(response: any[]): string[] {
  if (!Array.isArray(response) || response.length === 0) {
    return [];
  }

  const excludeKeys = ["id", "created_at", "updated_at", "progress_note", "stage_id"];
  const allKeys = Object.keys(response[0] as Record<string, any>);

  return allKeys
    .filter(key => !excludeKeys.includes(key))
    .map(key => {
      const parts = key.split("_");
      let label: string;

      // can_edit_events → Edit
      if (parts.length > 2 && parts[0] === "can") {
        label = parts.slice(1, -1).join(" ");
      } else {
        // user_name → user name
        label = key.replace(/_/g, " ");
      }

      // Capitalize each word
      return label
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    });
}

export function extractPageHeader(data: any[]): string[] {
  if (!Array.isArray(data) || data.length === 0) return [];

  const firstRole = data[0];
  const pages = Object.keys(firstRole.roleaccesspage || {}).map(page =>
    page
      .replace(/_/g, " ")           // underscores → spaces
      .split(" ")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1)) // capitalize each word
      .join(" ")
  );

  // wrap it in another array to match string[][] type
  return ["Rolename", ...pages];
}