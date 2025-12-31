/**
 * Environment configuration
 * Validates and exports environment variables with clear error messages
 */

function getEnvVar(key: string, required = true): string {
  const value = import.meta.env[key];
  
  if (!value && required) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
      `Please add it to your .env.local file.\n` +
      `See .env.local for the template.`
    );
  }
  
  return value || '';
}

export const env = {
  googleMapsApiKey: getEnvVar('VITE_GOOGLE_MAPS_API_KEY'),
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;
