export default interface LoggerService {
  /**
   * Logs the given message with INFO level.
   */
  info(message: string): void;

  /**
   * Logs the given message with WARN level.
   */
  warn(message: string): void;

  /**
   * Logs the given message (and error stacktrace if provided) with ERROR level.
   */
  error(message: string, error?: Error): void;
}
