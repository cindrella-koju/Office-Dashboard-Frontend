import { useState, useEffect, useCallback } from "react";
import { authFetch } from "../services/authHeaders";

// Re-export getAuthHeaders for backward compatibility
export { getAuthHeaders } from "../services/authHeaders";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useFetch<T = unknown>(url: string, options?: RequestInit & { includeAuth?: boolean }): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchKey, setRefetchKey] = useState<number>(0);

  const refetch = useCallback(() => {
    setRefetchKey(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      setData(null);
      setError(null);
      return;
    }

    const controller = new AbortController(); // for canceling fetch
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Auto-include auth headers unless explicitly disabled
        const includeAuth = options?.includeAuth !== false;
        
        let response: Response;
        
        if (includeAuth) {
          // Use authFetch which handles automatic token refresh
          response = await authFetch(url, { 
            ...options, 
            signal 
          });
        } else {
          // No auth needed, use regular fetch
          response = await fetch(url, { 
            ...options, 
            signal 
          });
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: T = await response.json();
        setData(result);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort(); 
    };
  }, [url, JSON.stringify(options), refetchKey]);

  return { data, loading, error, refetch };
}

export default useFetch;