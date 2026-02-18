/**
 * Auth Client - handles token refresh and clearing
 */
class AuthClient {
  /**
   * Get the refresh token from local storage
   */
  private getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  /**
   * Attempt to refresh the access token
   */
  async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      return null;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/user/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      const newAccessToken = data.access_token;
      
      sessionStorage.setItem('access_token', newAccessToken);
      
      // Update refresh token if a new one is provided
      if (data.refresh_token) {
        localStorage.setItem('refresh_token', data.refresh_token);
      }

      return newAccessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearTokens();
      return null;
    }
  }

  /**
   * Clear all auth tokens
   */
  clearTokens(): void {
    sessionStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('role_id');
    localStorage.removeItem('role');
  }
}

// Export singleton instance
export const authClient = new AuthClient();
export { AuthClient };
