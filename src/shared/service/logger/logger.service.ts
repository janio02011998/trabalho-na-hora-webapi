import { Service } from 'typedi';

import { getLogLevel } from '../environment';

import { ILoggerServiceHelper } from './logger.service.interface';

const writeConsoleLog = (msg: string, obj?: any, arg?: any[]) => {
  let writeLog = false;

  /**
   * @description Check level app level, if 'debug', will show as logs
   */
  if (getLogLevel() === 'debug') {
    writeLog = true;

    /**
     * @description App level is not 'debug', will only show [DEBUG] logs.
     */
  } else if (!msg.startsWith('[DEBUG]')) {
    writeLog = true;
  }

  if (writeLog) {
    const params: any[] = [];

    if (msg) {
      params.push(msg);
    }
    if (obj) {
      params.push(obj);
    }
    if (arg) {
      params.push(arg);
    }

    // eslint-disable-next-line no-console
    console.log(...params);
  }
};

@Service({ global: true })
export class LoggerServiceHelper implements ILoggerServiceHelper {
  constructor() {}

  public debug = (obj: any, msg?: string, arg?: any[]) => {
    const msgLog = `[DEBUG]` + (msg ? ' ' + msg : '');
    writeConsoleLog(msgLog, obj, arg);
  };

  public error = (obj: any, msg?: string, arg?: any[]) => {
    const msgLog = `[ERROR]` + (msg ? ' ' + msg : '');
    writeConsoleLog(msgLog, obj, arg);
  };

  public fatal = (obj: any, msg?: string, arg?: any[]) => {
    const msgLog = `[FATAL]` + (msg ? ' ' + msg : '');
    writeConsoleLog(msgLog, obj, arg);
  };

  public info = (obj: any, msg?: string, arg?: any[]) => {
    const msgLog = `[INFO]` + (msg ? ' ' + msg : '');
    writeConsoleLog(msgLog, obj, arg);
  };

  public metric = (obj: any, msg?: string, arg?: any[]) => {
    const msgLog = `[METRIC]` + (msg ? ' ' + msg : '');
    writeConsoleLog(msgLog, obj, arg);
  };

  public warn = (obj: any, msg?: string, arg?: any[]) => {
    const msgLog = `[WARN]` + (msg ? ' ' + msg : '');
    writeConsoleLog(msgLog, obj, arg);
  };
}
