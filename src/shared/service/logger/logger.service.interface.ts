export interface ILoggerServiceHelper {
  info: (obj: any, msg?: string | undefined, arg?: any[] | undefined) => void;
  debug: (obj: any, msg?: string | undefined, arg?: any[] | undefined) => void;
  warn: (obj: any, msg?: string | undefined, arg?: any[] | undefined) => void;
  error: (obj: any, msg?: string | undefined, arg?: any[] | undefined) => void;
  fatal: (obj: any, msg?: string | undefined, arg?: any[] | undefined) => void;
  metric: (obj: any, msg?: string | undefined, arg?: any[] | undefined) => void;
}
