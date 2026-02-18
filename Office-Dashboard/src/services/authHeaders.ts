import { authClient } from './auth.client';

export function getAuthHeaders(): Record<string, string> {
  const accessToken = sessionStorage.getItem('access_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  
  return headers;
}

// Token refresh state to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

/**
 * Get a fresh access token, refreshing if necessary
 * Handles concurrent refresh requests by returning the same promise
 */
async function getValidAccessToken(): Promise<string | null> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = authClient.refreshAccessToken();
  
  try {
    const token = await refreshPromise;
    return token;
  } finally {
    isRefreshing = false;
    refreshPromise = null;
  }
}

/**
 * Make an authenticated fetch request
 * Automatically refreshes the access token on 401 errors and retries the request
 */
export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = {
    ...getAuthHeaders(),
    ...(options.headers as Record<string, string>),
  };

  let response = await fetch(url, {
    ...options,
    headers,
  });

  // If we get a 401, try to refresh the token and retry
  if (response.status === 401) {
    const newToken = await getValidAccessToken();
    
    if (newToken) {
      // Retry with new token
      const retryHeaders = {
        ...headers,
        'Authorization': `Bearer ${newToken}`,
      };
      
      response = await fetch(url, {
        ...options,
        headers: retryHeaders,
      });
    } else {
      // No valid token available, redirect to login
      window.location.href = '/login';
    }
  }

  return response;
}
