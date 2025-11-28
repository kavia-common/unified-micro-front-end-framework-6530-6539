import { environment as dev, type EnvironmentType as AppEnvironment } from './environment';

/**
 * PUBLIC_INTERFACE
 * Production environment configuration.
 */
export const environment: AppEnvironment = {
  ...dev,
  production: true,
  enableSourceMaps: false,
  nodeEnv: 'production',
};

