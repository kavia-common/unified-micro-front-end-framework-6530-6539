export interface AppEnvironment {
  production: boolean;
  apiBase: string;
  backendUrl: string;
  frontendUrl: string;
  wsUrl: string;
  nodeEnv: string;
  telemetryDisabled: boolean;
  enableSourceMaps: boolean;
  port?: number;
  trustProxy?: string;
  logLevel?: string;
  healthcheckPath?: string;
  featureFlags: Record<string, boolean>;
  experimentsEnabled: boolean;
}

// Re-export type for consumers
export type EnvironmentType = AppEnvironment;

/**
 * PUBLIC_INTERFACE
 * Default environment configuration (development).
 * Values are read from global window.__env injected at runtime (e.g., via index.html or hosting),
 * with safe fallbacks for local development.
 */
declare const window: any; // for linter in non-browser contexts
const w: any = typeof window !== 'undefined' ? (window as any) : {};
const env = w.__env ?? {};

export const environment: AppEnvironment = {
  production: false,
  apiBase: env?.NG_APP_API_BASE ?? '',
  backendUrl: env?.NG_APP_BACKEND_URL ?? '',
  frontendUrl: env?.NG_APP_FRONTEND_URL ?? '',
  wsUrl: env?.NG_APP_WS_URL ?? '',
  nodeEnv: env?.NG_APP_NODE_ENV ?? 'development',
  telemetryDisabled: String(env?.NG_APP_NEXT_TELEMETRY_DISABLED ?? 'true') === 'true',
  enableSourceMaps: String(env?.NG_APP_ENABLE_SOURCE_MAPS ?? 'true') === 'true',
  port: Number(env?.NG_APP_PORT ?? 3000),
  trustProxy: env?.NG_APP_TRUST_PROXY ?? '',
  logLevel: env?.NG_APP_LOG_LEVEL ?? 'info',
  healthcheckPath: env?.NG_APP_HEALTHCHECK_PATH ?? '/healthz',
  featureFlags: parseFeatureFlags(env?.NG_APP_FEATURE_FLAGS),
  experimentsEnabled: String(env?.NG_APP_EXPERIMENTS_ENABLED ?? 'false') === 'true',
};

function parseFeatureFlags(raw: any): Record<string, boolean> {
  if (!raw) return {};
  try {
    if (typeof raw === 'string' && raw.trim().startsWith('{')) {
      return JSON.parse(raw);
    }
    if (typeof raw === 'string') {
      return raw.split(',').map(f => f.trim()).filter(Boolean).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>);
    }
    if (typeof raw === 'object') return raw;
  } catch {
    // ignore parse errors
  }
  return {};
}
