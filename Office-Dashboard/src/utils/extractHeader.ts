export default function extractHeaders(response: any[]): string[] {
  if (!Array.isArray(response) || response.length === 0) {
    return [];
  }
  const excludeKeys = ["id", "created_at", "updated_at","progress_note"];
  const allKeys = Object.keys(response[0] as Record<string, any>);
  const headers = allKeys.filter(key => !excludeKeys.includes(key));

  return headers;
}
