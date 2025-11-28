import { Injectable } from '@angular/core';
import { environment, type EnvironmentType as AppEnvironment } from '../../../environments/environment';

/**
 * PUBLIC_INTERFACE
 * ConfigService provides access to environment configuration and feature flags.
 */
@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly env: AppEnvironment = environment;

  /** Returns the entire environment object */
  getEnvironment(): AppEnvironment {
    return this.env;
  }

  /** Base API URL to use for HTTP calls */
  get apiBase(): string {
    return this.env.apiBase;
  }

  /** Backend service URL (for deep links, assets) */
  get backendUrl(): string {
    return this.env.backendUrl;
  }

  /** Frontend base URL (useful for redirects) */
  get frontendUrl(): string {
    return this.env.frontendUrl;
  }

  /** WebSocket base URL */
  get wsUrl(): string {
    return this.env.wsUrl;
  }

  /** Returns true if the feature flag is enabled */
  // PUBLIC_INTERFACE
  isFeatureEnabled(flag: string): boolean {
    return !!this.env.featureFlags?.[flag];
  }

  /** Returns whether experiments are enabled */
  get experimentsEnabled(): boolean {
    return this.env.experimentsEnabled;
  }
}
