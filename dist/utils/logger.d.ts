import { default as debug } from 'debug';
/**
 * Debug logger utility for WuzAPI
 * Uses the debug package for conditional logging
 *
 * Usage:
 * - Set DEBUG=wuzapi:* to see all logs
 * - Set DEBUG=wuzapi:request to see only request logs
 * - Set DEBUG=wuzapi:response to see only response logs
 */
export declare const logger: {
    request: debug.Debugger;
    response: debug.Debugger;
    error: debug.Debugger;
    info: debug.Debugger;
};
/**
 * Creates a logger instance with a specific namespace
 * @param namespace - The namespace for the logger (will be prefixed with 'wuzapi:')
 */
export declare const createLogger: (namespace: string) => debug.Debugger;
export default createLogger;
