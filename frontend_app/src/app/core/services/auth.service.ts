import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';

export interface LoginRequest {
  username: string;
  password: string;
  mfaCode?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  requiresMfa?: boolean;
}

/**
 * PUBLIC_INTERFACE
 * AuthService handles authentication, token storage, and basic auth state.
 */
declare const localStorage: any;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly accessTokenKey = 'app_access_token';
  private readonly refreshTokenKey = 'app_refresh_token';

  readonly isAuthenticatedSig = signal<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private router: Router
  ) {}

  /** Attempts login against backend auth endpoint */
  // PUBLIC_INTERFACE
  login(payload: LoginRequest) {
    // Note: do not hardcode endpoints; rely on apiBase.
    const url = `${this.config.apiBase}/auth/login`;
    return this.http.post<LoginResponse>(url, payload);
  }

  /** Requests password reset email */
  // PUBLIC_INTERFACE
  requestPasswordReset(email: string) {
    const url = `${this.config.apiBase}/auth/forgot`;
    return this.http.post<{ success: boolean }>(url, { email });
  }

  /** Resets password using token */
  // PUBLIC_INTERFACE
  resetPassword(token: string, newPassword: string) {
    const url = `${this.config.apiBase}/auth/reset`;
    return this.http.post<{ success: boolean }>(url, { token, newPassword });
  }

  // PUBLIC_INTERFACE
  completeMfa(username: string, mfaCode: string) {
    const url = `${this.config.apiBase}/auth/mfa`;
    return this.http.post<LoginResponse>(url, { username, mfaCode });
  }

  /** Persist tokens in localStorage for simplicity; could be replaced by secure storage. */
  // PUBLIC_INTERFACE
  persistTokens(accessToken: string, refreshToken?: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.accessTokenKey, accessToken);
      if (refreshToken) localStorage.setItem(this.refreshTokenKey, refreshToken);
    }
    this.isAuthenticatedSig.set(true);
  }

  /** Clears tokens and auth state */
  // PUBLIC_INTERFACE
  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.accessTokenKey);
      localStorage.removeItem(this.refreshTokenKey);
    }
    this.isAuthenticatedSig.set(false);
    this.router.navigate(['/auth/login']);
  }

  /** Returns current access token if present */
  // PUBLIC_INTERFACE
  getAccessToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(this.accessTokenKey);
  }

  /** Returns current refresh token if present */
  // PUBLIC_INTERFACE
  getRefreshToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(this.refreshTokenKey);
  }

  /** Whether we currently hold an access token */
  // PUBLIC_INTERFACE
  hasToken(): boolean {
    if (typeof localStorage === 'undefined') return false;
    return !!localStorage.getItem(this.accessTokenKey);
  }
}
