import 'dotenv/config';

/**
 * @description Identifica a variável de ambiente, se null define como 'dev'
 */
export function getEnvNode(): string {
  return process.env.NODE_ENV;
}

/**
 * @description Identify if environment is qa
 */
export function isDev(): boolean {
  return getEnvNode() === 'qa';
}

/**
 * @description Identify if environment is production
 */
export function isProd(): boolean {
  return getEnvNode() === 'prod';
}

/**
 * @description Identify if environment is aws lambda
 */
export function isAwsLambda(): boolean {
  return process.env.IS_AWS_LAMBDA === 'true';
}

/**
 * @description Identify log level app
 */
export function getLogLevel(): string {
  return process.env.APP_LOG_LEVEL || 'debug';
}
